import express, { Request, Response } from 'express'
import { check } from 'express-validator'
import { login } from '../controllers/userController'
import exp from 'constants'
import { verify } from 'crypto'
import verifyToken from '../middlewares/auth'

const router = express.Router()

router.post('/login', [
    check("email","Email is require").isEmail(),
    check("password","Password with 6 or more characters required").isLength({min: 6}),
],login)
router.get('/validate-token',verifyToken, (req: Request, res:Response)=>{
    res.status(200).send({userId: req.userId})
})
router.post('/logout',(req:Request, res: Response)=>{
    res.cookie('auth_token',"",{
        expires: new Date(0)
    })
    res.send()
})
export default router