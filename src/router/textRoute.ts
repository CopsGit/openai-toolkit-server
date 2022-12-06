import { Router } from 'express'
import {TextController} from "../controller/TextController";
import {verifyUser} from "../middleware/auth/AuthMiddleware";


const textRouter = Router()

textRouter.get('/', verifyUser, TextController.getAllActivities)

export default textRouter