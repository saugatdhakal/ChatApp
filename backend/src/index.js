import express from 'express';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.route.js';
import dotenv from 'dotenv'; 
import { connectDB } from './lib/db.js';
import cookieParser from "cookie-parser"; //To import cookie

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log('Server is running on port '+PORT);
    connectDB();
});

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);


