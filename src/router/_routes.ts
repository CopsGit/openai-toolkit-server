import {Router} from "express";
import userRouter from "./userRoute";
import indexRouter from "./indexRoute";
import textRouter from "./textRoute";

const routers = Router();

routers.use("/", indexRouter);
routers.use("/user", userRouter);
routers.use("/text", textRouter);

export default routers;