import {Request, Response} from 'express'
import Error, {Message, StatusCode} from "../util/Error";
import {CustomRequest, JwtPayload} from "../middleware/auth/AuthMiddleware";
import { Configuration, OpenAIApi } from "openai";
import openai from "../openai-api";

require('dotenv').config()

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
            prompt: generateImg(req.params.animal),
            temperature: 0.6,
        });
        return res.status(200).json(new Error(completion.data.choices[0].text, StatusCode.E200, Message.OK));
    }
}