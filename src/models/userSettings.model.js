const mongoose = require("mongoose");

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
module.exports = { userSettingsModal, userSettingsSchema }