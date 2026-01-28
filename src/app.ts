import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());


app.get('/health' , (_req , res)=>{
    res.json({message : 'Life is good '})
})


export default app;