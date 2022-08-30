const express = require("express");
const app=express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const router=express.Router();
const path=require("path");
const authRoute=require("./routes/auth")
const userRoute=require("./routes/users")
const conversationRoute=require("./routes/conversations")
const messageRoute=require("./routes/messages");
const cors=require("cors");
dotenv.config()

mongoose.connect(process.env.MONGO_URL,
    {useNewUrlParser:true,useUnifiedTopology:true},()=>{
        console.log("Connected")
    })

app.use(express.json())
app.use(cors());
app.use(helmet())
app.use(morgan("common"))

app.use("/back/auth", authRoute);
app.use("/back/users", userRoute);
app.use("/back/conversations", conversationRoute);
app.use("/back/messages", messageRoute);
// app.use("/api/posts", postRoute);
if(process.env.NODE_ENV== "production"){
// app.use(express.static(path.join(__dirname, "/front/build")));
app.use(express.static("front/build"));

} 
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/front/build', 'index.html'));
// });


app.listen(process.env.PORT || 1000,()=>{
    console.log("Connected to port 1000")
})