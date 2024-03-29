import { Request, Response } from "express";
import { UserInterface, userModal } from "../../models/user.model";
import { ResMessage, ResStatus } from "../../constants/server.constants";
import { userSettingsModal } from "../../models/userSettings.model";

class userService {
    constructor() { }

    async getSettings(req: Request, res: Response) {
        try {

            const { _id } = req.body;
            const userSettings = await userSettingsModal.findOne({ userId: _id })

            res.status(ResStatus.created).json({
                message: "Success.",
                body: { data: userSettings }
            });

        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: ResMessage.dbErr,
                body: error
            })
        }
    }
}

export default new userService()