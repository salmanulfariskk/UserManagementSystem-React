import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import Connection from './database/database.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());

app.use("/", userRoutes);

Connection();

app.set('port', 3000);
app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});