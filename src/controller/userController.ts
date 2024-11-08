import { NextFunction, Request, Response } from "express";
import { loginSchema } from "../models/loginModel";
import { usersService } from "../services/usersService";
import { ApiError } from "../middleware/error";


export class UsersController{
    
    async login (req:Request, res:Response, next:NextFunction){

         try {
            
            //Validation fields data
            const credentials  = loginSchema.parse(req.body);
            const token = await usersService.loginUser(credentials.email, credentials.password);

             if(token){
                res.status(200).json({
                    ok: true,
                    data:token
                });
             }
         } catch (error) {
            next(error);
         }
    }


    async createUsers(req:Request, res:Response, next:NextFunction){
        try {
            
            const filePath = req.file?.path;  //Dir of file
            console.log("filePath", filePath);

            if(!filePath){
                throw new ApiError("No CSV file provided", 400);
            }

            const result = await usersService.createUser(filePath);
            console.log("result"+ result);

            res.status(200).json({
                ok:true,
                message: "CSV processed successfully",
                result
            });
        } catch (error) {
            next(error);
        }
    }

}



export const usersController = new UsersController();