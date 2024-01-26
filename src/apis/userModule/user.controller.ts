import { NextFunction, Request, Response } from "express";
import { object, string } from "yup";
import { ResMessage, ResStatus } from "../../constants/server.constants";
import { UserInterface, userModal } from "../../models/user.model";
import { userSettingsModal } from "../../models/userSettings.model";
class userController {
    constructor() { }

    async getSettings(req: Request, res: Response, next: NextFunction) {
        try {

            const { _id } = req.body;
            if (!_id) {
                res.json({
                    message: ResMessage.validationErr
                }); return
            }

            next();

        } catch (error: any) {
            const { errors } = error;
            if (errors) {
                res.status(ResStatus.success).json({
                    message: ResMessage.validationErr,
                    body: {
                        errors
                    }
                }); return
            }
            res.status(ResStatus.internalServerError).json({
                message: ResMessage.controllerErr
            }); return
        }
    }

}

export default new userController()