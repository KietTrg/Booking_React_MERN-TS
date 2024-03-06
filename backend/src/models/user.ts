import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        require: true, 
        unique: true
    },
    password: {
        type: String, 
        require: true
    },
    firstName: {
        type: String, 
        require: true
    },
    lastName: {
        type: String, 
        require: true
    }
})
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        let password = this.password as string 
        password = await bcrypt.hash(password, 10)
        // let password: string = this.password!
        // password = await bcrypt.hash(password, 10);
        this.password = password
    }
    next();
  });

const User = mongoose.model<UserType>('User',userSchema)

export default User

