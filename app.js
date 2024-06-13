const express=require("express")
const mongooose=require("mongoose")
const cors=require("cors")
const {blogmodel}=require("./models/blog")
const bcrpyt=require("bcryptjs")
const jwt=require("jsonwebtoken")

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

app.post("/login",(req,res)=>{
  let input=req.body
  blogmodel.find({"email":req.body.email}).then(
    (response)=>{
        if(response.length>0){
            let dbPassword=response[0].pass
            console.log(dbPassword)
            bcrpyt.compare(input.pass,dbPassword,(error,isMatch)=>{
             if(isMatch){
                jwt.sign({email:input.email},"blog-app",{expiresIn:"1d"},(error,token)=>{
                    if(error)
                        {
                            res.json({"status":"unable to create token"})
                        }
                    else
                    {
                        res.json({"status":"success","userid":response[0]._id,"token":token})
                    }
                })
             }
             else{
                res.json({"status":"incorrect"})
             }

            })

        }
        else{
            res.json({"status":"'user not found"})
        }
       
    }
  ).catch()
})

app.listen(8080,()=>{
    console.log("server started")
})