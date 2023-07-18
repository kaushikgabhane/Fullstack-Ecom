import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";

// Its a  async IIFI (imedately invocked function).

( async () => {
    try {
        await mongoose.connect(config.MONGODB_URL);
        console.log("DB CONNECTED !");

        // It will deal with the errors coming from express.
        app.on('error', (err) => {
            console.error("ERROR: ", err);
            throw err
        })

        const onListening = () => {
            console.log(`Listening on port ${config.PORT}`);
        }

        app.listen(config.PORT, onListening)

    } catch (err) {
        console.log("ERROR: " , err);
    }
} )()