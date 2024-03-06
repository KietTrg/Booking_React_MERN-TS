import { Request, Response } from "express";
import User from "../models/user";
import jwt from 'jsonwebtoken'
import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs'
export const register = async(req: Request, res: Response)=>{
    let {email, password, firstName, lastName} = req.body
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({message:error.array()})
    }
    try {
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: 'User already exists'})
        }
        user = await User.create({
            email,
            password, 
            firstName,
            lastName
        })
        await user.save()
        const token = jwt.sign({userId: user.id},process.env.JWT_SECRET_KEY as string ,{
            expiresIn: '7d'
        })
        // console.log('token: ', token);
        res.cookie('auth_token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 604800000
        })
        return res.status(200).json({message: "register success"})
    } catch (error) {
        console.log('error: ', error);
       res.status(500).send({message: 'Something went wrong'})
        
    }
}
export const login = async(req:Request, res: Response) =>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({message: error.array()})
    }
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        // console.log('user: ', user);
        // console.log('user: ', user);
        if(!user){
            return res.status(400).json({message: 'Invalid Credentials'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: 'Password wrong'})
        }
        const token = jwt.sign({userId: user.id},process.env.JWT_SECRET_KEY as string, {
            expiresIn: '7d'
        })
       
        // console.log('token: ', token);
        res.cookie('auth_token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 604800000,
        })
        res.status(200).json({userId: user._id, message: 'Login success'})
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({message: 'Something went wrong'})
        
    }
}
