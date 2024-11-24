const express = require('express')
const app  = express()
const dotenv = require('dotenv')
const cors = require('cors')
const fs = require("fs")
const https = require("https")
dotenv.config()
const postRouter = require('./routes/postRoutes')
const userRouter = require("./routes/userRoutes")
app.use(cors({
    origin: "https://post-loom.vercel.app", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true,
  }));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("db connected"))
 
const PORT = process.env.PORT
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/posts',postRouter)
app.use('/api',userRouter)

const options = {
  key:fs.readFileSync('/home/ubuntu/ssl/ssl/server.key'),
  cert:fs.readFileSync('/home/ubuntu/ssl/ssl/server.crt')
}

app.get('/', (req, res) => {
  res.send('backend is working');
});

https.createServer(options,app).listen(PORT,()=>{
    console.log('https server is listening at',PORT)
    
})