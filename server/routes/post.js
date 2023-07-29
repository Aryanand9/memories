import express from 'express'
import { createPost, getPosts,deletePost, updatePost, likePost } from '../controllers/Posts.js'
const router = express.Router()

router.get('/',getPosts)
router.post('/',createPost)
router.patch('/:id',updatePost)
router.delete('/:id',deletePost)
router.patch('/:id/like',likePost)

export default router