import mongoose from "mongoose";

interface UserSettingsInterface {
    fullName: string
    username: string
    email: string
    password: string
}
const userSettingsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "UserId is requied"],
        unique: true
    },
    profileUrl: {
        type: String
    }
});

const userSettingsModal = mongoose.model('userSettings', userSettingsSchema)
export { userSettingsModal, userSettingsSchema, UserSettingsInterface }