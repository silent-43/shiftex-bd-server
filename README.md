# ShiftexBD Server

Backend API for **ShiftexBD**, a full-stack parcel delivery and management platform for parcel booking, online payment, parcel tracking, rider management, delivery assignment, warehouse management, and role-based dashboard operations.

## 🌐 Project

- **Live Website:** https://shiftex-bd.web.app
- **Backend API:** https://shiftex-bd-server.onrender.com
- **Client Repository:** https://github.com/silent-43/shiftex-bd-client
- **Server Repository:** https://github.com/silent-43/shiftex-bd-server

---

## 🛠️ Technologies

- Node.js
- Express.js
- MongoDB
- Stripe
- Firebase Admin SDK
- Firebase Authentication
- JWT
- CORS
- dotenv
- Crypto
- REST API

---

## ✨ Features

### 📦 Parcel Management

- Create new parcel delivery requests
- Store sender and receiver information
- Support document and non-document parcels
- Store parcel weight and delivery information
- Calculate delivery cost dynamically
- Same District and Outside District pricing
- Retrieve parcel information
- Update parcel information
- Update parcel delivery status
- Delete unpaid parcels
- Filter and sort parcels
- Manage user-specific parcels
- Store parcel payment information
- Store parcel tracking information
- Track parcel delivery progress

---

### 💰 Dynamic Delivery Pricing

The backend calculates parcel delivery costs based on parcel type, weight, and delivery location.

#### 📄 Document Parcel

| Delivery Type    | Price |
| ---------------- | ----: |
| Same District    |   ৳80 |
| Outside District |  ৳100 |

#### 📦 Non-Document Parcel Up To 3kg

| Delivery Type    | Price |
| ---------------- | ----: |
| Same District    |  ৳130 |
| Outside District |  ৳170 |

#### ⚖️ Non-Document Parcel Above 3kg

- Additional **৳40 per extra kg**
- Outside District delivery includes an additional **৳40 charge**

Examples:

| Parcel Weight | Same District | Outside District |
| ------------- | ------------: | ---------------: |
| 4kg           |          ৳170 |             ৳250 |
| 5kg           |          ৳210 |             ৳290 |

---

### 👤 User Management

- Store user information
- Create and update user records
- Retrieve registered users
- Role-based user management
- Support for User, Rider, and Admin roles
- Admin user management
- Backend role verification
- Protected role-specific API access
- User-specific parcel access
- User-specific payment information

---

### 🔐 Authentication & Security

- Firebase Authentication integration
- Firebase Admin SDK
- Firebase ID token verification
- JWT-based authorization
- Role-based access control
- Protected API endpoints
- Admin-only API endpoints
- Rider-specific API authorization
- User-specific API authorization
- CORS configuration
- Environment variable based configuration
- Secure credential management

---

### 💳 Stripe Payment System

- Stripe Checkout integration
- Secure payment session creation
- Payment verification
- Payment success handling
- Payment status management
- Transaction ID storage
- Payment history
- Paid/unpaid parcel status
- Payment information connected with parcel records
- Prevent duplicate payment records
- Duplicate payment-success request handling
- Automatic tracking ID generation after successful payment

---

### 🆔 Tracking System

- Automatically generate unique tracking IDs
- Generate tracking ID after successful payment
- Find parcels using tracking IDs
- Track parcel delivery status
- Store tracking history
- Manage delivery progress
- Synchronize parcel and rider delivery status
- Maintain timeline-based tracking events

Supported tracking statuses include:

```text
Pickup Pending
      ↓
Rider Assigned
      ↓
Rider Arriving
      ↓
Parcel Picked Up
      ↓
Parcel Delivered
```
