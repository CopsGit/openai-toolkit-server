import { Router } from 'express'
import {UserController} from "../controller/UserController";
import {verifyUser} from "../middleware/auth/AuthMiddleware";
import {TextController} from "../controller/TextController";


const textRouter = Router()

textRouter.get('/petName/:animal', TextController.namePet)
textRouter.post('/img', TextController.textToImg)
textRouter.post('/test', TextController.redisTest)

export default textRouter