const express=require("express")
const mongooose=require("mongoose")
const cors=require("cors")
const {blogmodel}=require("./models/blog")
const bcrpyt=require("bcryptjs")

const generateHashedPassword=async(password)=>{
    const salt=await bcrpyt.genSalt(10)
    return bcrpyt.hash(password,salt)

}

const app=express()
app.use(cors())
app.use(express.json())

mongooose.connect("mongodb+srv://dhiya04:dhiyafisat@cluster0.wspdqan.mongodb.net/blogdb?retryWrites=true&w=majority&appName=Cluster0")
app.post("/signup",async(req,res)=>{
    let input=req.body
    let hashedPassword=await generateHashedPassword(input.pass)
    console.log(hashedPassword)
    input.pass=hashedPassword
    let blog=new blogmodel(input)
    blog.save()
    console.log(blog)
    res.json({"status":"success"})
})

app.listen(8080,()=>{
    console.log("server started")
})