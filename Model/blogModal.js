const mongoose=require('mongoose')
const blogSchema=mongoose.Schema({
    username:String,
    title:String,
    content:String,
    category:String,
    date:String,
    likes:String,
    comments:Array
},
{
    versionkey:false
}
)
const blogModal=mongoose.model('blogentry', blogSchema)
module.exports={blogModal}