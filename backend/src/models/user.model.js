import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    profpic:{
        type: String,
        // required: true
    },
    password:{
        type: String,
        required: [true,"Password is required"]
    },
    fullname:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    dateOfBirth:{
        type: Date,
        required: true
    },
    refreshToken:{
        type: String
    }
},
{
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()
    
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    try {
        return jwt.sign(
            {
            _id: this._id,
            email: this.email,
            username: this.username,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    } catch (error) {
        console.error("Error generating access token:", error);
        throw new Error("Failed to generate access token");
    } 
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
        _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    ) 
}


export const User = mongoose.model("User",userSchema) 