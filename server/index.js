import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import Route from './routes/route.js'

const app = express()
dotenv.config()

app.use(cors())
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))


const PORT = process.env.PORT || 8000
const URL = process.env.MONGODB_URI || "mongodb+srv://mishor:patra@cluster0.ny7mg.mongodb.net/BLOGAPP?retryWrites=true&w=majority"
app.use('/', Route)

app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`))
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(
    console.log('Database is connected succesfully')
).catch(error => { 
    console.log('Error while connecing the mongoDb: ', error)
})

