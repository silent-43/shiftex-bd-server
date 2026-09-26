# ShiftexBD Server

Backend API for **ShiftexBD**, a full-stack parcel delivery and management platform for parcel booking, online payment, tracking, rider management, delivery assignment, and role-based dashboard operations.

## 🌐 Project

- **Live Website:** https://shiftex-bd.web.app
- **Backend API:** https://shiftex-bd-server.onrender.com
- **Client Repository:** https://github.com/silent-43/shiftex-bd-client
- **Server Repository:** https://github.com/silent-43/shiftex-bd-server

## 🛠️ Technologies

- Node.js
- Express.js
- MongoDB
- Stripe
- Firebase Admin
- CORS
- dotenv
- Crypto
- REST API

## ✨ Features

### 📦 Parcel Management

- Create new parcel delivery requests
- Retrieve parcel information
- Update parcel information and status
- Delete parcels
- Filter and sort parcels
- Manage user-specific parcels
- Track parcel delivery status

### 👤 User Management

- Store and manage user information
- Role-based user management
- Support for User, Rider, and Admin roles
- Admin user management
- Backend role verification
- Protected role-specific API access

### 🔐 Authentication & Security

- Firebase Authentication integration
- Firebase Admin SDK
- Secure Firebase ID token verification
- JWT-based authorization
- Role-based access control
- Protected API endpoints
- CORS configuration
- Environment variable based configuration

### 💳 Stripe Payment System

- Stripe Checkout integration
- Secure payment session creation
- Payment verification
- Payment status management
- Transaction ID storage
- Payment history
- Prevent duplicate payment records
- Automatic tracking ID generation after successful payment

### 🔎 Parcel Tracking

- Automatically generate unique tracking IDs
- Find parcels using tracking IDs
- Track parcel delivery status
- Manage delivery progress
- Synchronize parcel and rider delivery status

### 🚴 Rider Management

- Rider registration/application management
- Admin rider approval
- Admin rider rejection
- Rider status management
- View available riders
- Assign riders to parcels
- Manage rider-specific delivery data
- Support rider delivery workflow

### 🚚 Delivery Assignment

- Assign individual parcels to riders
- Maintain rider and parcel assignments
- View assigned deliveries
- Manage completed deliveries
- Manage rejected deliveries
- Update parcel status according to delivery progress
- Support the complete rider delivery workflow

### 🏢 Warehouse Management

- Store warehouse information
- Manage parcel handoff data
- Support parcel movement through the delivery workflow
- Maintain warehouse-related delivery information

### 📊 Dashboard APIs

Backend APIs provide role-specific data and functionality for:

#### 👑 Admin

- Manage users
- Approve or reject riders
- Assign riders to parcels
- Manage parcels
- View payment information
- Manage delivery operations

#### 🚴 Rider

- View assigned deliveries
- Manage delivery assignments
- Complete deliveries
- Reject delivery assignments
- Update delivery status

#### 👤 User

- Create parcels
- View personal parcels
- View payment information
- Track parcel delivery status

## 🔎 Tracking ID

A unique tracking ID is automatically generated after successful payment.

Example:

```text
SBD-20260919-a7f3c2
```
