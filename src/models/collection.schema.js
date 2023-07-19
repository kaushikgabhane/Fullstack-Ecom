import mongoose  from "mongoose";

const collectonSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: ["true", "Please provide a collection name"],
            trim: true,
            maxLength: [
                120,
                "Collection name should not be more than 120 chars",
            ]
        }
    
        
    },
    {timestamps: true}
    );

    export default mongoose.model("Collection",collectonSchema)
    // In database it will always stored as "collections"
    // i.e. all small and plural form.