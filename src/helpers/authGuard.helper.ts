import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { ResMessage, ResStatus } from "../constants/server.constants";
import { ResInterface } from "../interfaces/common.interfaces";

const authGuard = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization
    try {
        const payload: any = jwt.verify(authorization?.replace("Bearer", "").trim() ?? "", process.env.JWT_SECRET ?? "");
        req.body._id = payload?.data?._id
        next();
    } catch (error: any) {
        const resData: ResInterface = {
            message: ResMessage.unauthorizedErr,
            body: error
        }
        res.status(ResStatus.unauthorized).json(resData)
    }

}

export default authGuard