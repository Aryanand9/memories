import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import postRoute from './routes/post.js'

dotenv.config()
const app = express()
app.use(bodyParser.json({limit:'30mb', extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb', extended:true}))
app.use(cors())
app.use('/posts',postRoute)

const connectionUrl = process.env.MONGODB_URL
const port = 5000;

mongoose.connect(connectionUrl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=> app.listen(port,()=>console.log("MONGODB CONNECTED")))
.catch((error)=>console.log(error.message))
mongoose.set('useFindAndModify',false)