import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt;"

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
        index: true,
        trim: true
    },
    profileImage:{
        type: String
    },
    mbtiType:{
        type: String
    },
    bio:{
        type: String
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken:{
        type: String
    }
},{
    timestamps: true
})

export const User = mongoose.model("User",userSchema)


userSchema.pre("save", async function(){
    this.password = bcrypt.hash(this.password,10)
    next()
})
if (!this.isModified("password"))   return next();

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}


userSchema.methods.generateAccessToken = function(){

}
userSchema.methods.generateRefreshToken = function(){
    
}