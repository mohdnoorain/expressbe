import { ResMessage, ResStatus } from "../../constants/server.constants";

class userController {
    constructor() { }

    async getSettings(req, res, next) {
        try {

            const { _id } = req.body;
            if (!_id) {
                res.json({
                    message: ResMessage.validationErr
                }); return
            }

            next();

        } catch (error) {
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