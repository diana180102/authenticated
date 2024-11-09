import { Router } from "express";
import { UsersController } from "../controller/userController";
import { upload } from "../middleware/upload";
import { validationHandler } from "../middleware/validations";
import { UsersSchema } from "../models/usersModel";
import { authentication } from "../middleware/authentication";
import { authorization } from "../middleware/authorization";
import { loginSchema } from "../models/loginModel";

export const userRouter = Router();
const usersController = new UsersController();




userRouter.post('/upload', upload.single("file"), authentication, authorization('admin'), usersController.createUsers);
userRouter.post('/login',  validationHandler(loginSchema) , usersController.login);

