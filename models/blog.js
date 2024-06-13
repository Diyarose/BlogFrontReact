const mongooose=require("mongoose")
const schema=mongooose.Schema(
    {
        "name":{type:String,required:true},
        "email":{type:String,required:true},
        "pass":{type:String,required:true}
    }
)

let blogmodel=mongooose.model("blogs",schema)
module.exports={blogmodel}
