# 🛒 Team Project – Full-Stack E-Commerce Application

A complete **full-stack e-commerce platform** built using modern web technologies. This project is designed with scalability, security, and performance in mind and consists of three main applications:

* **Admin Panel** – Product, order, and user management
* **Client Application** – Customer-facing shopping experience
* **Server (Backend API)** – Handles authentication, data, and business logic

---

## 📌 Project Overview

This project demonstrates a real-world e-commerce system with role-based access, secure authentication, product management, order processing, and modern UI/UX practices.

---

## ✨ Features

### 🔐 Admin Panel

* Admin authentication & authorization
* Dashboard with analytics and charts
* Product management (Add / Update / Delete)
* Category management
* Order management & invoice handling
* User management
* Home slider & banner management
* Admin profile & password update

---

### 🛍 Client Application

* User registration & login (Firebase Authentication)
* Product listing & advanced search
* Shopping cart management
* Secure checkout process
* Order tracking
* User profile management
* Address management
* Wishlist functionality

---

### ⚙️ Server (Backend)

* RESTful API architecture
* JWT-based authentication & authorization
* MongoDB database integration
* Image upload handling
* Email verification & notifications
* Cloudinary integration for image storage
* Secure middleware (Helmet, CORS)

---

## 🧰 Tech Stack

### Frontend (Admin & Client)

* **React.js** – UI development
* **Vite** – Fast development & build tool
* **Material UI (MUI)** – UI components
* **Tailwind CSS** – Utility-first styling
* **Axios** – API requests
* **React Router DOM** – Routing
* **Framer Motion** – Animations
* **Swiper.js** – Sliders
* **Firebase** – Client authentication

---

### Backend (Server)

* **Node.js** – Runtime environment
* **Express.js** – Web framework
* **MongoDB** – Database
* **Mongoose** – ODM
* **JWT** – Authentication
* **Bcrypt.js** – Password hashing
* **Multer** – File uploads
* **Nodemailer** – Email service
* **Cloudinary** – Image storage
* **Morgan** – Logger
* **Helmet** – Security middleware

---

## 🚀 Installation & Setup

### 📋 Prerequisites

* Node.js (v14+)
* MongoDB (Local or Cloud)
* npm or yarn

---

### 🔧 Clone Repository

```bash
git clone <repository-url>
cd Team-Project-
```

---

### 📦 Install Dependencies

#### Server

```bash
cd Server
npm install
```

#### Admin Panel

```bash
cd ../Admin
npm install
```

#### Client Application

```bash
cd ../Client
npm install
```

---


---

## ▶️ Run the Application

#### Start Backend Server

```bash
cd Server
npm run dev
```

#### Start Admin Panel

```bash
cd Admin
npm run dev
```

#### Start Client Application

```bash
cd Client
npm run dev
```

---

## 🌐 Application URLs

* **Admin Panel:** [http://localhost:5173](http://localhost:5173)
* **Client App:** [http://localhost:5174](http://localhost:5174)
* **Backend API:** [http://localhost:5000](http://localhost:5000)

---

## 📡 API Endpoints

### Authentication

* `POST /api/user/signup`
* `POST /api/user/signin`
* `POST /api/user/logout`

### Products

* `GET /api/product/get-all-products`
* `POST /api/product/add-product`
* `PUT /api/product/update-product/:id`
* `DELETE /api/product/delete-product/:id`

### Categories

* `GET /api/category/get-all-category`
* `POST /api/category/add-category`

### Orders

* `POST /api/order/create-order`
* `GET /api/order/get-all-orders`
* `GET /api/order/get-user-orders`

### Cart

* `POST /api/cart/add-to-cart`
* `GET /api/cart/get-cart`
* `DELETE /api/cart/delete-cart-item`

---

## 📁 Project Structure

```
Team-Project-/
├── Admin/        # Admin React App
├── Client/       # Client React App
├── Server/       # Node.js Backend
├── README.md
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/your-feature-name
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push to GitHub

```bash
git push origin feature/your-feature-name
```

5. Create a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 📞 Contact

For any issues or support, please contact the development team.

---

⭐ **If you like this project, don’t forget to give it a star!**
