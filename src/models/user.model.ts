import mongoose from "mongoose";

interface UserInterface {
    fullName: string
    username: string
    email: string
    password: string
}
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Name is requied"],
    },
    username: {
        type: String,
        required: [true, "Username is requied"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is requied"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is requied"]
    }
});

const userModal = mongoose.model('user', userSchema)
export { userModal, userSchema, UserInterface }