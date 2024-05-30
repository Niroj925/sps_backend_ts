import { JwtPayload } from "../type/type";
import * as jwt from 'jsonwebtoken';
require('dotenv').config();

export class Token {
    async generateRefreshToken(jwtPayload: JwtPayload) {
        if(!process.env.RT_SECRET){
            throw new Error('not found');
        }
        const token= jwt.sign({jwtPayload},process.env.RT_SECRET,{
            expiresIn:'60d'
        })
        return token;
    }
    async generateAcessToken(jwtPayload: JwtPayload) {
        if(!process.env.AT_SECRET){
            throw new Error('not found');
        }
        const token= jwt.sign({jwtPayload},process.env.AT_SECRET,{
            expiresIn:'45m'
        })
        return token;
    }
}