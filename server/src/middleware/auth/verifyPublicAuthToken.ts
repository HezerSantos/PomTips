import { RequestHandler } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { JsonWebTokenError } from "jsonwebtoken";
import throwError from "../../helpers/errorHelper";
dotenv.config()


const AUTH_SECRET = String(process.env.AUTH_SECRET)


const verifyPublicAuthToken: RequestHandler = async(req, res, next) => {
    try{
        const authCookie = req.cookies['__Secure-public-auth.access']
        if(!authCookie){
            throwError("Unauthorized", 401, {msg: "Unauthorized", code: "INVALID_ENTRY_TOKEN"})
            return
        }
        jwt.verify(authCookie, AUTH_SECRET)
        next()
    } catch(error){
        const jwtError = error as JsonWebTokenError || Error
        if(jwtError.name === 'JsonWebTokenError' || jwtError.name === 'TokenExpiredError'){
            throwError("Unauthorized", 401, {msg: "Unauthorized", code: "INVALID_ENTRY_TOKEN"})
        } else {
            next(error)
        }
    }
}

export default verifyPublicAuthToken