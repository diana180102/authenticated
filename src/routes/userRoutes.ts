import { Router } from "express";
import { UsersController } from "../controller/userController";
import { upload } from "../middleware/upload";

export const userRouter = Router();
const usersController = new UsersController();


userRouter.post('/upload', upload.single("file"), usersController.createUsers);

