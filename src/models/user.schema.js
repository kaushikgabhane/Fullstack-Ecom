import mongoose from "mongoose";
import AuthRoles from "../utils/authroles.js"
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: ["true", "Name is required"],
    },
    email: {
        type: String,
        required: ["true", "Email is required"],
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "password must be at least 8 chars"],
        select: false
    },
    role:{
        type: String,
        enum: Object.values(AuthRoles),
        default: AuthRoles.USER
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date

} , {timestamps: true})

// Encrypt the password before saving: HOOKS
// We are not using arrow fn here because we want to fetch properties using `this`

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password , 10)
    next()
})

userSchema.methods = {
    // compare passwords
    comparePassword: async function(enteredPassword){
        return await bcrypt.compare(enteredPassword, this.password)
    }
}

export default mongoose.model("User", userSchema)