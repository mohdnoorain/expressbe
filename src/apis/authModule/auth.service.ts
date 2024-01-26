import { Request, Response } from "express";
import { UserInterface, userModal } from "../../models/user.model";
import { ResMessage, ResStatus } from "../../constants/server.constants";
import { userSettingsModal } from "../../models/userSettings.model";

class authService {
    constructor() { }

    async signUp(req: Request, res: Response) {
        try {

            const { username, fullName, email, password }: UserInterface = req.body;

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

export default new authService()