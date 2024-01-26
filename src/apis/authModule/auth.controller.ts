import { NextFunction, Request, Response } from "express";
import { object, string } from "yup";
import { ResMessage, ResStatus } from "../../constants/server.constants";
import { UserInterface, userModal } from "../../models/user.model";
import jwt from "jsonwebtoken"
import { ResInterface } from "../../interfaces/common.interfaces";
class authController {
    constructor() { }

    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const { fullName, username, email, password }: UserInterface = req.body;

            const userValidations = object({
                fullName: string().required("Full name is required.").min(4, "Full name must have atleast 3 characters."),
                username: string().required("Username is required.").min(4, "Username must have atleast 4 characters."),
                email: string().required("Email is required.").email("Invalid email."),
                password: string().required("Password is required").min(4, "Password must have atleast 4 characters")
                    .max(32, "Password can't have more than 32 characters")
            });


            await userValidations.validate({ fullName, username, email, password });

            let user = await userModal.findOne({ email })
            if (user?.email) {
                res.json({
                    message: `Account already exist with this email : ${user?.email}`,
                    body: { fullName, username, email }
                }); return
            }

            user = await userModal.findOne({ username })
            if (user?.username) {
                res.json({
                    message: `Account already exist with this username : ${user?.username}`,
                    body: { fullName, username, email }
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

    async signIn(req: Request, res: Response) {
        try {
            const { email, password }: UserInterface = req.body;

            const userValidations = object({
                email: string().required("Email is required.").email("Invalid email."),
                password: string().required("Password is required")
            });


            await userValidations.validate({ email, password });

            let user = await userModal.findOne({ email, password });

            if (!user?.email) {
                res.json({
                    message: `Invalid 'Username' OR 'Password'`,
                    body: { email }
                }); return;
            }
            user.password = "*****";
            const secret = process.env.JWT_SECRET || 'secret';
            const token = jwt.sign({ data: user }, secret, { expiresIn: '1d' });
            const resData: ResInterface = {
                message: "Sign in successfully.",
                body: { user, token }
            }
            res.status(ResStatus.success).json(resData);

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

export default new authController()