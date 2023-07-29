import PostMessage from "../model/postMessage.js";
import mongoose from "mongoose";
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    console.log(error);
  }
};
export const createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;
  const newPost = new PostMessage({
    title,
    message,
    selectedFile,
    creator,
    tags,
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error.message);
    console.log("Server Error");
  }
};
export const updatePost = async (req, res) => {
  const { id } = req.params;
  console.log("ID Getted" , id)
  console.log("UPDATE POST")
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Post OF That Id");
  const updatedPost = await PostMessage.findByIdAndUpdate(id, {...post,id}, {
    new: true,
  });
  res.json(updatedPost)
};

export const deletePost = async(req,res)=>{
  const {id} = req.params
  console.log(id)
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post OF That Id");
  await PostMessage.findByIdAndDelete(id)
  res.json({message:'Deleted Sucessfully'})
}
export const likePost = async(req,res)=>{
  console.log('Post updated')

  const {id} = req.params
  console.log(id);
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post OF That Id");
console.log('Abb sahi nahi hai')
  const post = await PostMessage.findById(id)
  console.log(post.likeCount)
  const updatedPost = await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount+1},{new:true})
  res.json(updatedPost)
}