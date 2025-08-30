import { Request, Response, NextFunction } from "express";
import { JWT_USER_PASSWORD } from "./config";
import jwt = require("jsonwebtoken");

declare global{
    namespace Express{
        interface Request{
            userId?: string;
        }
    }
}

interface UserPayload {
    userId: string;
}

export function Auth(req: Request, res: Response, next: NextFunction){
    // const token = req.cookies.token;
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({msg: "No token provided or malformed header"})
    }
    const token = authHeader.split(' ')[1]; // extracting the token from the bearer

    if(!token){
        return res.status(401).json({
            msg: "No token provided"
        })
    }

    try{
        if (!JWT_USER_PASSWORD) {
            console.error("JWT secret is not configured.");
            return res.status(500).json({
                msg: "Server configuration error."
            });
        }

        const response = jwt.verify(token, JWT_USER_PASSWORD) as UserPayload;

        req.userId = response.userId;
        next();
    }catch(e){
        return res.status(401).json({
            msg: "Invalid or expired token"
        });
    }
}