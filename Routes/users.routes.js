const express=require('express')
var jwt = require('jsonwebtoken');
const { userModal } = require('../Model/userModal')
const useRouter=express.Router()
const bcrypt=require('bcrypt')
useRouter.post('/login',async(req,res)=>{
    let myPlaintextPassword=req.body.password
    try{
        const users=await userModal.find({email:req.body.email})
        if(users[0]){
            let hash=users[0].password
            const user=users[0]
            bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
                if(result){
                    var token = jwt.sign({ masai:user }, "masai"); 
                    res.status(200).send({"msg":"Login Successfull",'token':token})
                }
            });
        }
    }
    catch(err){
     console.log(err)
    }
})
useRouter.post('/register',(req,res)=>{
    let myPlaintextPassword=req.body.password
        bcrypt.hash(myPlaintextPassword, 5,async(err, hash)=> {
            req.body.password=hash
            try{
                const user=new userModal(req.body)
                await user.save()
                res.status(200).send({"msg":"registered successfull","user":req.body})
            }
            catch(err){
                res.status(200).send({"msg":"some error from backend","err":err})
            }
             
        });
})
useRouter.patch('/update/:id',async(req,res)=>{
    try{
          const id=req.params.id
          console.log(id)
          const user=await userModal.findByIdAndUpdate({_id:id},req.body)
          res.status(200).send({"msg":`the user with id- ${id} has been updated successfully`,"update":req.body})
    }
    catch(err){
        res.status(500).send({"msg":"Some error occured in Backend","err":err})
    }
})
useRouter.delete('/delete/:id',async(req,res)=>{
    try{
        const id=req.params.id
        console.log(id)
        const user=await userModal.findOneAndDelete({_id:id})
        res.status(200).send({"msg":" User deleted successfully"})
    }
    catch(err){
        res.status(500).send({"msg":"Some error occured in Backend","err":err})
    }
})
module.exports={useRouter}