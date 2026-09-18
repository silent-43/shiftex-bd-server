# ShiftexBD Server

Backend API for **ShiftexBD**, a modern parcel delivery and management platform.

This server handles parcel management, MongoDB database operations, Stripe payment processing, and REST API communication with the ShiftexBD frontend.

---

## 🌐 Project

- **Live Website:** https://shiftex-bd.web.app
- **Client Repository:** https://github.com/silent-43/shiftex-bd-client
- **Server Repository:** https://github.com/silent-43/shiftex-bd-server

---

## 📌 About The Project

ShiftexBD Server is the backend service for the ShiftexBD parcel delivery platform.

It provides REST APIs for:

- Parcel creation
- Parcel retrieval
- User-specific parcel filtering
- Parcel details
- Parcel deletion
- Stripe checkout session creation
- Payment status update
- MongoDB database operations

The backend is built with Node.js and Express.js and uses MongoDB for data storage.

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB
- MongoDB Node.js Driver
- Stripe
- CORS
- dotenv
- REST API

---

## 📦 Main Features

### Parcel Management

The server provides APIs for managing parcels.

- Create a new parcel
- Get all parcels
- Get parcels by sender email
- Get a single parcel by ID
- Delete a parcel
- Sort parcels by creation date

---

### 💳 Stripe Payment

The backend integrates **Stripe Checkout** for parcel payments.

Features include:

- Create Stripe Checkout Session
- Customer email integration
- Parcel ID stored in Stripe metadata
- Payment success handling
- Payment status update in MongoDB
- Success and cancelled payment redirects

---

### 🗄️ MongoDB

ShiftexBD uses MongoDB as the primary database.

### Database

```text
Database: shiftex_bd_db
Collection: parcels
```
