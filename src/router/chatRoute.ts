import { Router } from 'express'
import {ChatController} from "../controller/ChatController";


const chatRouter = Router()

chatRouter.post('/', ChatController.basicChat)

export default chatRouter