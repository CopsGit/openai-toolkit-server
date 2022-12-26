import { Router } from 'express'
import {ChatController} from "../controller/ChatController";


const chatRouter = Router()

chatRouter.get('/', ChatController.basicChat)

export default chatRouter