import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';    
import helmet from 'helmet';
import connectDB from './config/connectDb.js';
import userRouter from './route/userroute.js';
import categoryRouter from './route/categoryroute.js';
import productRouter from './route/productroute.js';
import cartRouter from './route/cartroutes.js';
import myListRouter from './route/mylistroute.js';
import addressRouter from './route/addressroute.js';
import homeSlidesRouter from './route/homeSlidesroutes.js';
import orderRouter from './route/orderroutes.js';
import adminRouter from './route/adminroute.js';


dotenv.config();

const app = express();

// Disable ETag globally to prevent 304 responses
app.set('etag', false);

// Middlewares
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet({
    crossOriginResourcePolicy: false
}));

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.json({
        message: `Server is running on port ${PORT}`
    });
});
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/myList', myListRouter);
app.use('/api/address', addressRouter);
app.use('/api/homeSlides', homeSlidesRouter);
app.use('/api/order', orderRouter);
app.use('/api/admin', adminRouter);

// Connect DB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("✅ Server is running on port", PORT);
    });
});

