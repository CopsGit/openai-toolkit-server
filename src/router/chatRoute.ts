import { Router } from 'express'
import {ChatController} from "../controller/ChatController";


const chatRouter = Router()

chatRouter.post('/', ChatController.basicChat)
chatRouter.post('/code', ChatController.codeChat)

export default chatRouter