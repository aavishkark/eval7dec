const express=require('express')
var jwt = require('jsonwebtoken');
const { blogModal } = require('../Model/blogModal');
const blogRouter=express.Router()

blogRouter.get('/blogs',async(req,res)=>{
    let token=req.headers.token
    var decoded = jwt.verify(token, 'masai')
    try{
        const users=await blogModal.find({username:decoded.masai.username})
        res.status(200).send({"blogs":users})
    }
    catch(err){
        res.status(200).send({"msg":"some error from backend","err":err})
    }
})
blogRouter.post('/blogs',async(req,res)=>{
    let token=req.headers.token
    console.log(token)
    var decoded = jwt.verify(token, 'masai')
    req.body.username=decoded.masai.username
    try{
        const blog=new blogModal(req.body)
        await blog.save()
        res.status(200).send({"msg":"Posted Successfully","blog":req.body})
    }
    catch(err){
        res.status(200).send({"msg":"some error from backend","err":err})
    }
})
module.exports={blogRouter}