import dotenv, { configDotenv } from "dotenv";
import express from "express";
import { userRouter } from "./routes/userRoutes";

dotenv.config();



export const app = express();
const port = 5500;

app.use(express.json());
app.use('/', userRouter);


app.listen(port, () => console.log(`Listening in port ${port}`));