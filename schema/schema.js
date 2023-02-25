const mongoose=require("mongoose")
const Schema=mongoose.Schema
const cloneModel=new Schema({
    title:{type:String},
    author:{type:String},
    PostImage:{type:String},
    ingredients:{type:String},
    description:{type:String}
})
const model=mongoose.model("post",cloneModel)
module.exports=model;