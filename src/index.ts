import dotenv from "dotenv";
import express from "express";
import { userRouter } from "./routes/userRoutes";
import errorHandler from "./middleware/error";
import cors from "cors";

dotenv.config();



export const app = express();
app.use(cors());
const port = 5500;

app.use(express.json());
app.use('/', userRouter);
app.use(errorHandler);


app.listen(port, () => console.log(`Listening in port ${port}`));