import mongoose from 'mongoose'

const PostSchema = mongoose.Schema({
    creator:String,
    message:String,
    title:String,
    tags:[String],
    selectedFile:String,
    likeCount:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})
const PostMessage = mongoose.model("PostSchema",PostSchema)
export default PostMessage