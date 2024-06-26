import { JwtPayload } from '../helper/type/type';
import * as jwt from 'jsonwebtoken';
import { Request,Response,NextFunction } from "express";
require('dotenv').config();

const validateRT = (req:any, res:Response, next:any) => {
    const token:any = req.headers.token;
    // console.log(token);
    if (!token) {
      return res.status(403).json({ success: false, message: "Token not provided" });
    }

    try {
        if(!process.env.RT_SECRET){
            throw new Error('not found');
        }
      const decoded = jwt.verify(token, process.env.RT_SECRET);
      req.user = decoded; // Set the userId property on the req object
      next();
    } catch (err:any) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: "Token has expired" });
    } else if (err.name === 'JsonWebTokenError') {
        return res.status(403).json({ success: false, message: "Invalid token" });
    } else {
        return res.status(403).json({ success: false, message: "Token verification failed" });
    }
    }
  };

  const validateAT = (req:any, res:Response, next:any) => {
    const token:any = req.headers.token;
    if (!token) {
      return res.status(403).json({ success: false, message: "Token not provided" });
    }
  
    try {
        if(!process.env.AT_SECRET){
            throw new Error('not found');
        }
      const decoded = jwt.verify(token, process.env.AT_SECRET);
      req.user = decoded // Set the userId property on the req object
      next();
    } catch (err:any) {
      // return res.status(403).json({ success: false, message: "Invalid token" });
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: "Token has expired" });
    } else if (err.name === 'JsonWebTokenError') {
        return res.status(403).json({ success: false, message: "Invalid token" });
    } else {
        return res.status(403).json({ success: false, message: "Token verification failed" });
    }
    }
  };

  export {validateAT,validateRT};