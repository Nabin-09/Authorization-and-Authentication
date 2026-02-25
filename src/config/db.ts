import mongoose from "mongoose";

export async function connectDB(){
    try{    
        await mongoose.connect(process.env.MONGO_URI!);
        console.log(`✅ Mongo connection succesfull ! `);
        
    }catch(err){    
        console.log(`❌MongoGo DB Connection error ${err} `);
        process.exit(1);
        
    }
}