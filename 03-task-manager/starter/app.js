require('dotenv').config()
const express=require('express')
const app=express()
const PORT=process.env.PORT||3000

const  mongoose  = require('mongoose')
const path=require('path')
const cors=require('cors')

const connectDB=require('./config/connectDB')
const corsOptions=require('./config/corsOptions')
const credentials=require('./middleware/credentials')
const errorHandler=require('./middleware/errorHandler')

//connecting to mongodb
connectDB()

//parsing form data
app.use(express.urlencoded({extended:false}))

//parsing json data
app.use(express.json())

//CORS And Credentials
app.use(credentials)
app.use(cors(corsOptions))

//server static files
app.use(express.static(path.join(__dirname,'public')))

//routes
app.use('/api/v1/tasks',require('./routes/tasks'))
//custom error handler
app.use(errorHandler)


mongoose.connection.once('open',()=>{
    console.log("Connected to MongoDB")
    app.listen(PORT,()=>console.log(`Server Running on port: ${PORT}`))
})