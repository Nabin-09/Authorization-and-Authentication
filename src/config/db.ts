import mongoose from "mongoose";

export async function connectToDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI!);
        console.log(`MongoDB connected succesfully ! `)
    }catch(err){
        console.log(`Error connecting to database ${err}`);
        process.exit(1)
    }
}