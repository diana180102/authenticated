import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "./authentication";
import { ApiError } from "./error";

export function authorization(...allowedRoles: string[]) {
    return async (req: AuthenticatedRequest, res:Response, next: NextFunction) =>{
        
        if(!req.user || !req.user.email){
            return next(new ApiError("No authorize", 401));
        }

        if(!req.user.role){
            return next(new ApiError("Rol undefined", 401));
        }

        if(allowedRoles.includes(req.user.role)){
            return next();
        }else {
            next(new ApiError ("Access denegate", 403));
        }
    };
}