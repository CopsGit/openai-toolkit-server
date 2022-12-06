import {Response} from 'express'
import Error, {Message, StatusCode} from "../util/Error";
import {CustomRequest, JwtPayload} from "../middleware/auth/AuthMiddleware";
const activityModel = require('../models/activity')
const userModel = require('../models/user')
import { Configuration, OpenAIApi } from "openai";

require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export class TextController {
    static namePet = async (req: CustomRequest, res: Response) => {

        const generateImg = (animal: any) => {
            const capitalizedAnimal =
                animal[0].toUpperCase() + animal.slice(1).toLowerCase();
            return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
        }

        const completion = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: generateImg(req.body.animal),
            temperature: 0.6,
        });
        return res.status(200).json(new Error(completion.data.choices[0].text, StatusCode.E200, Message.OK));
    }
}