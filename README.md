# ShiftexBD Server

Backend API for **ShiftexBD**, a full-stack parcel delivery and management platform.

The server handles parcel management, payment processing, tracking, MongoDB operations, and REST API communication with the ShiftexBD frontend.

---

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
- MongoDB Node.js Driver
- Stripe
- Firebase Admin
- CORS
- dotenv
- Crypto
- REST API

---

## ✨ Features

### 📦 Parcel Management

- Create parcel
- Get all parcels
- Get parcels by sender email
- Get parcel by ID
- Delete parcel
- Sort parcels by creation date
- Update parcel payment status
- Store parcel tracking ID

### 💳 Stripe Payment

- Stripe Checkout integration
- Create checkout session
- Customer email handling
- Parcel information in Stripe metadata
- Payment verification
- Payment status update
- Payment success handling
- Cancelled payment redirect

### 🔎 Tracking

After successful payment, the server automatically generates a unique tracking ID.

Example:

```text
SBD-20260919-a7f3c2
```
