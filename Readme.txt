# 🍕 Pizza Delivery Application

A full-stack Pizza Delivery Application developed using the MERN stack as part of the **Web Development and Designing Internship at Oasis Infobyte (OIBSIP)**.

The application allows users to build custom pizzas, place orders, make payments through Razorpay Test Mode, and track order status. It also provides an admin dashboard for inventory and order management.

---

## 🚀 Features

### Authentication & Authorization

* User Registration and Login
* Admin Login
* JWT-based Authentication
* Protected Routes
* Email Verification using Nodemailer
* Forgot Password & Reset Password Functionality
* Role-Based Access Control (Admin/User)

### Pizza Customization

Users can create custom pizzas by selecting:

* Pizza Bases
* Sauce Options
* Cheese Options
* Multiple Toppings

The total price is automatically calculated based on the selected ingredients.

### Payment Integration

* Razorpay Test Mode Integration
* Secure Order Payment Flow
* Payment Status Tracking
* Order Confirmation after Successful Payment

### Inventory Management

Admin can:

* Add, Update and Delete Pizza Bases
* Add, Update and Delete Sauces
* Add, Update and Delete Cheese Types
* Add, Update and Delete Toppings
* Manage Ingredient Stock Levels

### Stock Management

* Stock decreases automatically after successful orders
* Out-of-stock ingredients cannot be selected by users
* Updated stock is reflected immediately in the dashboard

### Low Stock Alert System

* Automatic email notifications are sent to the admin when inventory falls below a predefined threshold
* Helps maintain ingredient availability and avoid stock shortages

### Order Management

Admin can:

* View all customer orders
* Update order status

Order Status Flow:

```text
Order Received
      ↓
In Kitchen
      ↓
Sent for Delivery
```

Users can view real-time status updates from their dashboard.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Tokens)
* bcryptjs

### Email Services

* Nodemailer

### Payments

* Razorpay Test Mode

---

## 📂 Project Structure

```text
pizza-delivery/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
│
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

ADMIN_EMAIL=admin@example.com
```

---

## 🏃 Installation

### Clone Repository

```bash
git clone <repository-url>
cd pizza-delivery
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

---

## 📸 Key Functionalities

✅ User Registration & Login

✅ Email Verification

✅ Forgot Password System

✅ Pizza Builder

✅ Inventory Management

✅ Stock Tracking

✅ Razorpay Payment Integration

✅ Low Stock Email Alerts

✅ Order Status Tracking

✅ Admin Dashboard

---

## 🎯 Internship Task Coverage

This project successfully implements all major requirements specified in the Oasis Infobyte Level 3 Pizza Delivery Application task, including:

* Authentication & Authorization
* Email Verification
* Forgot Password
* Pizza Customization
* Razorpay Integration
* Inventory Management
* Automatic Stock Updates
* Low Stock Email Notifications
* Order Management
* User Order Tracking

---

## 👨‍💻 Developed By

**Sooryansh Singh**

B.Tech CSE, NIT Durgapur

Developed as part of the **Web Development and Designing Internship Program at Oasis Infobyte (OIBSIP)**.

