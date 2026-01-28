import { connectToDB } from "./config/db";
import app from "./app";
import dotenv from 'dotenv';
import http from 'http'

dotenv.config();

async function startServer(){
    await connectToDB();
    const server = http.createServer(app);

    server.listen(process.env.PORT , ()=>{
        console.log(`Server is now running on port ${process.env.PORT}`);
        
    })
}

startServer().catch( err => {
    console.error(`Error while serving the server ${err}`)
    process.exit(1);
})