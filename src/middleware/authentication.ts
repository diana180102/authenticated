import { NextFunction, Response, Request } from "express";
import { ApiError } from "./error";
import jwt from 'jsonwebtoken';
import { config } from "../config/config";

export interface AuthenticatedRequest extends Request{
    user?:{
      email:string,
      role: string,
    }
}

export function authentication (req: AuthenticatedRequest, res:Response, next:NextFunction){
    
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if(!token){
        next(new ApiError("Unuathorized: No token provided", 401));
    }

    try {
        const payload = jwt.verify(token as string, config.secret.key as string);
        req.user = payload as AuthenticatedRequest['user'];

        return next();
    } catch (error) {
        next(new ApiError("Unuathorized: Invalid token", 403));
    }


}