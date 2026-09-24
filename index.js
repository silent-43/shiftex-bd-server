const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const port = process.env.PORT || 3000;



const admin = require("firebase-admin");

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, "base64").toString("utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//for generate trackingId
const crypto = require("crypto");

const generateTrackingId = () => {
  const prefix = "SBD";
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = crypto.randomBytes(3).toString("hex");

  return `${prefix}-${date}-${random}`;
};


//middleware
app.use (express.json());
app.use(cors());

const verifyFBToken = async(req, res, next) => {
  // console.log('header in the middleware :', req.headers.authorization)
  const token = req.headers.authorization;
  if(!token){
    return res.status(401).send({message: 'unauthorized access'})
  }
  try{
    const idToken = token.split(' ')[1];
    const decoded = await admin.auth().verifyIdToken(idToken);
    console.log('decoded in the token :', decoded);
    req.decoded_email=decoded.email;
    next();
  }
  catch(err){
      return res.status(401).send({message: 'unauthorized access'})
  }



  
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.figz0pw.mongodb.net/?appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db('shiftex_bd_db');
    const userCollection = db.collection('users');
    const parcelsCollection = db.collection('parcels');
    const paymentCollection = db.collection('payments');
    const ridersCollection = db.collection('riders');

    //middleware more with database access
    //admin before allowing admin activity
    //must be used after verifyFBToken middleware
    const verifyAdmin = async (req, res, next)=>{
      const email = req.decoded_email;
      const query = {email};
      const user = await userCollection.findOne(query);

      if(!user || user.role !== 'admin'){
        return res.status(403).send({message: 'forbidden access'});
      }


      next();
    }

    //user related apis
    app.get('/users',verifyFBToken, async(req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.patch('/users/:id/role',verifyFBToken,verifyAdmin, async(req, res) => {
      const id = req.params.id;
      const roleInfo = req.body;
      const query = {_id: new ObjectId(id)};

      const updatedDoc = {
        $set: {
          role: roleInfo.role
        }
      }

      const result = await userCollection.updateOne(query, updatedDoc);
      res.send(result);
    })

    app.get('/users/:id', async(req, res) => {

    })

    app.get('/users/:email/role', async(req, res) => {
      const email = req.params.email;
      const query = {email};
      const user = await userCollection.findOne(query);
      res.send({role: user?.role || 'user'})
    })

    app.post('/users', async(req, res)=>{
      const user = req.body;
      user.role = 'user';
      user.createdAt = new Date();

      const email = user.email;
      const userExist = await userCollection.findOne({email})
      if(userExist){
        return res.send({message: 'user exist'})
      }

      const result = await userCollection.insertOne(user);
      res.send(result);
    })




    //parcel api
    app.get('/parcels', async(req, res) => {
        const query = {}
        const {email} = req.query;
        //parcels?email ''&
        if(email){
            query.senderEmail = email;
        }

        const options = {sort: {createdAt: -1}};

        const cursor = parcelsCollection.find(query,options);
        const result = await cursor.toArray();
        res.send(result);

    })

    app.get('/parcels/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await parcelsCollection.findOne(query);
      res.send(result);
    })

    app.post('/parcels', async(req, res) => {
        const parcel = req.body;

        //parcel created time
        parcel.createdAt = new Date();
        const result = await parcelsCollection.insertOne(parcel);
        res.send(result);
    })

    app.delete('/parcels/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await parcelsCollection.deleteOne(query);
      res.send(result);
    })

    app.patch("/parcels/:id", async (req, res) => {
        const id = req.params.id;
        const updatedParcel = req.body;
        const filter = { _id: new ObjectId(id),};
        const updateDoc = {
                      $set: updatedParcel,
                };

        const result = await parcelsCollection.updateOne(filter,updateDoc);
        res.send(result);
    });


// Payment Related APIs
// ==========================================================================================

app.post("/create-checkout-session", async (req, res) => {
  try {
    const paymentInfo = req.body;

    // Parcel cost in BDT
    const amount = Number(paymentInfo.cost);

    if (!amount || amount <= 0) {
      return res.status(400).send({
        message: "Invalid payment amount",
      });
    }

    // Stripe expects amount in the smallest currency unit
    // 80 BDT = 8000 poisha
    const stripeAmount = Math.round(amount * 100);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "bdt",
            unit_amount: stripeAmount,

            product_data: {
              name: `Please Pay For: ${paymentInfo.parcelName}`,
            },
          },

          quantity: 1,
        },
      ],

      customer_email: paymentInfo.senderEmail,

      mode: "payment",

      metadata: {
        parcelId: paymentInfo.parcelId,
        parcelName: paymentInfo.parcelName,

        // MongoDB / payment record er jonno actual BDT amount
        amount: amount.toString(),
      },

      success_url: `${process.env.SITE_DOMAIN}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.SITE_DOMAIN}/dashboard/payment-cancelled`,
    });

    console.log("Stripe Session Created:", session.id);

    res.send({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);

    res.status(500).send({
      message: "Failed to create checkout session",
      error: error.message,
    });
  }
});

    // update payment status 
    app.patch('/payment-success', async(req, res)=>{
      const sessionId = req.query.session_id;

      const session = await stripe.checkout.sessions.retrieve(sessionId);
      // console.log('session retrieve', session)
      
      const transactionId = session.payment_intent;
      const query = {transactionId: transactionId}
      const paymentExist = await paymentCollection.findOne(query);
      // console.log(paymentExist)
      if(paymentExist){
        return res.send({
          message:'already exist', transactionId,
          trackingId: paymentExist.trackingId
        })
      }



      const trackingId = generateTrackingId();

      if(session.payment_status === 'paid'){
        const id = session.metadata.parcelId;
        const query = {_id: new ObjectId(id)};
        const update = {
          $set: {
            paymentStatus: 'paid',
            trackingId: trackingId
          }
        }
        const result = await parcelsCollection.updateOne(query, update);

        const payment = {
          amount: session.amount_total/100,
          currency: session.currency,
          customerEmail: session.customer_email,
          parcelId: session.metadata.parcelId,
          parcelName: session.metadata.parcelName,
          transactionId: session.payment_intent,
          paymentStatus: session.payment_status,
          paidAt: new Date(),
          trackingId: trackingId
        }
        if(session.payment_status === 'paid'){
          const resultPayment = await paymentCollection.insertOne(payment)
          res.send({
            success: true, 
            modifyParcel: result, 
            trackingId: trackingId,
            transactionId: session.payment_intent,
            paymentInfo: resultPayment})
        }

        // res.send(result);
      }

      // console.log('session id :', sessionId);
      res.send({success: false});
    })


    app.get('/payments',verifyFBToken, async(req, res)=>{
      const email = req.query.email;
      const query = {};

      // console.log('headers :', req.headers);


      if(email){
        query.customerEmail=email;

        //check email address
        if(email !== req.decoded_email){
          return res.status(403).send({message: 'forbidden access'})
        }
      }
      const cursor = paymentCollection.find(query).sort({paidAt: -1});
      const result = await cursor.toArray();
      res.send(result);

    })

    //riders related api
    app.get('/riders', async(req, res) => {
      const query = {};
      if(req.query.status){
        query.status = req.query.status;
      }
      const cursor = ridersCollection.find(query).sort({createdAt: -1});
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/riders', async(req, res)=>{
      const rider = req.body;
      rider.status = 'pending';
      rider.createdAt = new Date();

      const result = await ridersCollection.insertOne(rider);
      res.send(result);
    })

    app.patch('/riders/:id', verifyFBToken, verifyAdmin,  async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};

      const status = req.body.status;
      const updatedDoc = {
        $set: {
          status: status
        }
      }

      const result = await ridersCollection.updateOne(query,updatedDoc)


      if(status === 'approved'){
        const email = req.body.email;
        const userQuery = {email};
        const updateUser = {
          $set: {
            role: 'rider'
          }
        }
        const userResult = await userCollection.updateOne(userQuery, updateUser);
      }


      res.send(result);
    })

    app.delete('/riders/:id',verifyFBToken, async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await ridersCollection.deleteOne(query);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('ShiftexBD server is running !')
})

app.listen(port, () => {
  console.log(`ShiftexBD listening on port ${port}`)
})