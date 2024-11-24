const express = require('express')
const app  = express()
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const postRouter = require('./routes/postRoutes')
const userRouter = require("./routes/userRoutes")
app.use(cors({
    origin: "http://13.234.80.189:3000", 
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

app.get('/', (req, res) => {
  res.send('backend is working');
});

app.listen(PORT,(req,res)=>{
    console.log('server is listening at',PORT)
    res.send("backend is working")
})