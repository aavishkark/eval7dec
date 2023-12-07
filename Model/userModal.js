const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    username:String,
    avatar:String,
    email:String,
    password:String
},
{
    versionkey:false
}
)
const userModal=mongoose.model('bloguser', userSchema)
module.exports={userModal}