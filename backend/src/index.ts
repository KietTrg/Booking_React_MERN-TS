import express, {Request, Response} from 'express'
import 'dotenv/config'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import cookieParser from 'cookie-parser'



const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL_CONNECTION as string,{autoIndex: true})
        console.log('mongodb connecting...')
    } catch (error) {
        console.log('error: ', error);
        
    }
}

const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))


app.use('/api/users',userRoutes)
app.use('/api/auth',authRoutes)

connectDB()
app.listen(5000, ()=>{
    console.log(`server running on 5000`)
})