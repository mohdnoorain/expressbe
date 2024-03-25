const string = require("yup");
const object = require("yup");
const { ResMessage, ResStatus } = require("../../constants/server.constants");
const userModal = require("../../models/user.model");
const jwt = require("jsonwebtoken");

class authController {
    constructor() { }

    async signUp(req, res, next) {
        try {
            const { fullName, username, email, password } = req.body;

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

    async signIn(req, res) {
        try {
            const { email, password } = req.body;

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
            const resData = {
                message: "Sign in successfully.",
                body: { user, token }
            }
            res.status(ResStatus.success).json(resData);

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

module.exports = new authController()