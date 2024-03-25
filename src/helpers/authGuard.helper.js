import jwt from "jsonwebtoken"
import { ResMessage, ResStatus } from "../constants/server.constants";

const authGuard = (req, res, next) => {
    const authorization = req.headers.authorization
    try {
        const payload = jwt.verify(authorization?.replace("Bearer", "").trim() ?? "", process.env.JWT_SECRET ?? "");
        req.body._id = payload?.data?._id
        next();
    } catch (error) {
        const resData = {
            message: ResMessage.unauthorizedErr,
            body: error
        }
        res.status(ResStatus.unauthorized).json(resData)
    }

}

export default authGuard