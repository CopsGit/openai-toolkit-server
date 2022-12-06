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

    static textToImg = async (req: CustomRequest, res: Response) => {
        let image_url = null;
        try{
            const description = req.body.description;
            const response = await openai.createImage({
                prompt: description,
                n: 5,
                size: "256x256",
            });
            image_url = response.data.data;
        } catch (e) {
            return res.status(StatusCode.E500).send(new Error(e, StatusCode.E500, Message.ErrCreate))
        }
        return res.status(200).json(new Error(image_url, StatusCode.E200, Message.OK));
    }
}