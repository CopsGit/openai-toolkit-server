import {Request, Response} from 'express'
// import AppDataSource from "../data-source";
import Error, {Message, StatusCode} from "../util/Error";
import {CustomRequest, JwtPayload} from "../middleware/auth/AuthMiddleware";

require('dotenv').config()
// redis keeps verify code for 5 min
const ttl = 60 * 5

export class UserController {
    static getAllUsers = async (req: Request, res: Response) => {
        return res.status(200).json({
            message: 'GET ALL USERS'
        })
    }

    // login user
    static loginUser = async (req: Request, res: Response) => {
    }

    // refresh tokens: get a new access token and a new refresh token
    static getNewTokens = async (req: Request, res: Response) => {
    }

    // send verify code by email
    static sendVerifyCode = async (req: Request, res: Response) => {
    }

    // register user
    static registerUser = async (req: Request, res: Response) => {
    }

    // logout user if user login with oAuth
    static logoutUser = (req: Request, res: Response) => {
    }

    static getUserId = async (req: CustomRequest, res: Response) => {
        let user =null
        if(req.userWithJwt) {
            const {email, isStaff} = req.userWithJwt as JwtPayload
            try {
            } catch (e) {
            }
        }

        return res.status(StatusCode.E200).send(new Error(user, StatusCode.E200, Message.OK))
    }
}