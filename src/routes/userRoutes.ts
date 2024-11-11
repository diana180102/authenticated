import { Router } from "express";
import { UsersController } from "../controller/userController";
import { upload } from "../middleware/upload";
import { validationHandler } from "../middleware/validations";

import { authentication } from "../middleware/authentication";
import { authorization } from "../middleware/authorization";
import { loginSchema } from "../models/loginModel";
import { UsersSchema } from "../models/usersModel";

export const userRouter = Router();
const usersController = new UsersController();




userRouter.post('/upload', upload.single("file"), authentication, authorization('admin'), usersController.UploadUsers);
userRouter.post('/login',  validationHandler(loginSchema) , usersController.login);
userRouter.post('/register', validationHandler(UsersSchema), usersController.registerUser);

