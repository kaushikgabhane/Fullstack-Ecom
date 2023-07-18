import mongoose from "mongoose";


( async () => {
    try {
        await mongoose.connect("mongoose://localhost:27017/ecomm");
        console.log("DB CONNECTED !!");
    } catch (err) {
        console.log("ERROR: " , err);
    }
} )()