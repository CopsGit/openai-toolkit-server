import {Request, Response} from 'express'
import Error, {Message, StatusCode} from "../util/Error";
import {CustomRequest} from "../middleware/auth/AuthMiddleware";
import openai from "../openai-api";
import getOrSetRedisCache from "../util/getOrSetRedisCache";
import * as fs from "fs";
import path from "path";

require('dotenv').config()

const defaultExpireTime = 600

export class TextController {
    static redisTest = async (req: Request, res: Response) => {
        let image_url = null;
        try{
            const description = req.body.description;
            image_url = await getOrSetRedisCache(`photos?description=${description}`, defaultExpireTime, async () => {
                const response = await openai.createImage({
                    prompt: description,
                    n: 5,
                    size: "256x256",
                });
                return response.data.data;
            })
        } catch (e) {
            return res.status(StatusCode.E500).send(new Error(e, StatusCode.E500, Message.ErrCreate))
        }
        return res.status(200).json(new Error(image_url, StatusCode.E200, Message.OK));
    }

    static namePet = async (req: CustomRequest, res: Response) => {
        const generateName = (animal: any) => {
            const capitalizedAnimal =
                animal[0].toUpperCase() + animal.slice(1).toLowerCase();
            return `Animal: ${capitalizedAnimal} Names:`;
        }

        const completion = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: generateName(req.params.animal),
            temperature: 0.6,
        });
        return res.status(200).json(new Error(completion.data.choices[0].text, StatusCode.E200, Message.OK));
    }

    static conversation = async (req: CustomRequest, res: Response) => {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: req.body.conversation,
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
            stop: [" Human:", " AI:"],
        });
        return res.status(200).json(new Error(response.data.choices[0].text, StatusCode.E200, Message.OK));
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

    static imgEditMask = async (req: Request, res: Response) => {
        try {
            // const createImg = async () => {
            //     const rawBuffer: Buffer = await Buffer.from(req.body.image, 'base64');
            //
            //     const writeStream = fs.createWriteStream(path.join(__dirname, 'image.png'));
            //     writeStream.write(rawBuffer);
            //     writeStream.end();
            // }
            // createImg().then()
            const uploadedFile = (req as any).files;
            console.log(uploadedFile)
            // const imageData = await fs.readFileSync(path.join(__dirname, 'image.png'));
            // const uploadedFile = req.files.file;
            const buffer = Buffer.from(req.body.image, 'base64');
            console.log(buffer)

            const file: any = buffer;
// Set a `name` that ends with .png so that the API knows it's a PNG image
            file.name = "image.png";

            const response = await openai.createImageVariation(
                file,
                1,
                "256x256"
            );

            return res.status(200).send(new Error(response.data, StatusCode.E200, Message.OK));
        }  catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        return res.status(StatusCode.E500).json(new Error(error, StatusCode.E500, Message.ErrCreate))
    }
    }
}