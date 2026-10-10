# PasaMart 🏔️

A full-stack e-commerce web application built with the **MERN stack (MongoDB, Express.js, React, and Node.js)**.

PasaMart is a learning project focused on building a functional e-commerce platform with a customer storefront, product management, authentication, and a protected admin dashboard.

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- React-Bootstrap
- Axios
- Redux Toolkit

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- Multer
- cookie-parser
- CORS

## ✨ Features

### Customer Storefront

- Browse available products
- View individual product details
- Register and log in
- Add products to the shopping cart
- Manage cart items and quantities

### Admin Dashboard

- Protected admin routes
- View products in a management table
- Create new products
- Upload product images
- Edit existing products
- Delete products

### Authentication & Security

- Password hashing with bcryptjs
- JWT-based authentication using HTTP-only cookies
- Authentication middleware for protected routes
- Role-based access control for admin operations
- CORS configuration for credential-based requests

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- npm
- MongoDB (local installation or MongoDB Atlas)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/prashanna-png/ecommerce.git
cd ecommerce
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/himalayanshop
JWT_SECRET_KEY=replace_with_a_long_random_secret
NODE_ENV=development
```

If you use MongoDB Atlas, replace `MONGO_URI` with your database connection string.

**Important:** Keep your `.env` file private. Never commit database credentials or JWT secrets to GitHub.

Start the backend:

```bash
npm run server
```

The backend should run on port `3000`, provided that your server configuration uses this port.

### 3. Set Up the Frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, typically:

http://localhost:5173

### 4. Configure the Vite Proxy

Make sure `frontend/vite.config.js` contains the appropriate API proxy configuration:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
```

This forwards frontend requests beginning with `/api` to the Express backend during local development.

## 🔐 Authentication

PasaMart uses JWT-based authentication with HTTP-only cookies.

- Users can register and log in.
- Passwords are hashed before being stored.
- Protected endpoints validate user authentication.
- Admin-only operations require the appropriate role.
- Cookie-based requests are configured for communication between the frontend and backend.

## 🛣️ Future Improvements

Planned improvements as development continues:

- Complete checkout and shipping address management
- Create orders and display order history
- Integrate a payment gateway
- Add product reviews and ratings
- Build order management for administrators
- Improve validation and error handling
- Deploy the application to production

## 🎯 Project Goal

The goal of PasaMart is to develop practical full-stack development skills by building an e-commerce application incrementally, covering REST APIs, authentication, frontend state management, product management, and order processing.

## 📄 License

No open-source license has been specified yet. Add a `LICENSE` file if you decide to distribute this project under a particular license.
