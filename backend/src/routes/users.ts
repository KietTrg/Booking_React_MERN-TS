import express, { Request, Response } from 'express'
// import User from '../models/user'

import {register} from '../controllers/userController'
import { check } from 'express-validator'
const router = express.Router()

router.post('/register',[
    check("firstName","First Name is required").isString(),
    check("lastName","Last Name is required").isString(),
    check("email","email is required").isEmail(),
    check("password","Password with 6 or more characters required").isLength({min: 6}),
], register)
export default router