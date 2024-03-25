const userModal = require("../../models/user.model");
const { ResMessage, ResStatus } = require("../../constants/server.constants");
const userSettingsModal = require("../../models/userSettings.model");

class authService {
    constructor() { }

    async signUp(req, res) {
        try {

            const { username, fullName, email, password } = req.body;

            const result = new userModal({
                username, fullName, email, password
            });

            const user = await result.save();
            user.password = "*****";
            await new userSettingsModal({ userId: user?._id, profileUrl: "dummy path" }).save();
            res.status(ResStatus.created).json({
                message: "User created successfully.",
                body: {
                    data: user
                }
            })

        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: ResMessage.dbErr,
                body: error
            })
        }
    }
}

module.exports = new authService()