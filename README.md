# 🛒 MERN E-Commerce Website

A complete **MERN stack E-Commerce application** built using **React.js, Node.js, Express.js, and MongoDB**.  
It allows users to browse products, add them to the cart, and make purchases securely.  
The admin panel enables product management, order tracking, and inventory control.

![Project Preview](./preview.png)

---

## 📋 Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Project Structure](#project-structure)  
4. [Installation](#installation)  
5. [Environment Variables](#environment-variables)  
6. [Usage](#usage)  
7. [Available Scripts](#available-scripts)  
8. [Folder Overview](#folder-overview)  
9. [Screenshots](#screenshots)  
10. [Contributing](#contributing)  
11. [License](#license)  

---

## 🚀 Features

### 👨‍💻 User Features
- User registration & login with JWT authentication  
- Browse all products with category filters  
- Product detail page with images & description  
- Add to cart, update quantity, remove items  
- Checkout page with total calculation  
- Order placement with confirmation  
- User order history  

### 🧑‍💼 Admin Features
- Admin login & dashboard  
- Add / Edit / Delete products  
- Manage categories  
- View all users and orders  
- Inventory management  

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js, React Router, Axios, Context API / Redux, TailwindCSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | JWT (JSON Web Token), bcrypt |
| **Image Upload** | Cloudinary / Multer |
| **Deployment** | Render / Vercel / MongoDB Atlas |

---

## 🗂️ Project Structure

MERN-Ecommerce/
│
├── backend/
│ ├── config/ # Database connection & environment setup
│ ├── controllers/ # Business logic (products, users, orders)
│ ├── models/ # MongoDB models (User, Product, Order)
│ ├── routes/ # Express routes
│ ├── middleware/ # Auth & error handling
│ ├── server.js # Entry point for backend
│
├── frontend/
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Page-level components (Home, Product, Cart)
│ │ ├── context/ # Global state (CartContext / Redux)
│ │ ├── App.js # Main app component
│ │ └── index.js # Entry point
│
├── .env.example
├── package.json
├── README.md
└── ...


---

## ⚙️ Installation

### 🧩 Prerequisites
Make sure you have installed:
- Node.js (>= 16)
- npm or yarn
- MongoDB running locally or a MongoDB Atlas account

### 🔧 Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mern-ecommerce.git
   cd mern-ecommerce


Install dependencies

Backend

cd backend
npm install


Frontend

cd ../frontend
npm install


Setup environment variables

Create a .env file in the backend folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000


Run the application

Open two terminals:

Backend

cd backend
npm run dev


Frontend

cd frontend
npm start


Visit the app at:
👉 http://localhost:3000

📜 Available Scripts
Backend
Command	Description
npm run dev	Start backend server with nodemon
npm start	Start backend without hot reload
Frontend
Command	Description
npm start	Start the React development server
npm run build	Build production bundle
npm test	Run frontend tests
🌈 Screenshots
Homepage	Product Page	Cart Page

	
	
🤝 Contributing

Contributions are always welcome!
To contribute:

Fork the repo

Create a feature branch: git checkout -b feature/YourFeature

Commit your changes: git commit -m "Added new feature"

Push the branch: git push origin feature/YourFeature

Open a Pull Request

📄 License

done
