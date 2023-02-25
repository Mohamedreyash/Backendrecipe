const cloudinary=require("../cloudinary/cloudinary");
const express=require("express");
const route=express();
const fileupload=require("express-fileupload");
const postSchema=require("../schema/schema");
route.use(express.json({limit:"5mb"}));
route.use(fileupload({useTempFiles:true}));
const body=require("body-parser");
route.use(express.urlencoded());
route.use(body.urlencoded({extended:true}));
route.use(body.json());
route.get("/getPost",async(req,res)=>{
    const data=await postSchema.find();
    res.status(200).json(data);
});
route.post("/createPost",async(req,res)=>{
    try{
        const img=req.files.PostImage.tempFilePath;
        const{title,author,ingredients,description}=req.body;
        const image=await cloudinary.uploader.upload(img,{
            public_id:`$(Date.now())`,
            resourse_type:"auto",
            folder:"images"
        });
        const data=await postSchema.create({
            title:title,
            author:author,
            PostImage:image.secure_url,
            ingredients:ingredients,
            description:description,
        });
        data.save();
        res.status(200).json({
            message:"Post Saved",
        })
    }catch(e){
        return res.json({
            status:e.message
        })
    }
});
module.exports=route;