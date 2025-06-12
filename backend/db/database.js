import mongoose from "mongoose";


export const dbUrl = process.env.ATLASDB_URL;

async function connectToDatabase(){
    try{
        await mongoose.connect(dbUrl);
        console.log('connected to MongoDB');
    } catch(error){
        console.log("Error connecting to MongoDB: ", error);
        throw error;
    }
}

export default connectToDatabase;