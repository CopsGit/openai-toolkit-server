import {Router} from "express";
import userRouter from "./userRoute";
import indexRouter from "./indexRoute";
import textRouter from "./textRoute";
import chatRouter from "./chatRoute";

const routers = Router();

routers.use("/", indexRouter);
routers.use("/user", userRouter);
routers.use("/text", textRouter);
routers.use("/chat", chatRouter);

export default routers;