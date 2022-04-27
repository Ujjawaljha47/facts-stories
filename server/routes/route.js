import express from 'express'

import { createPost, viewDetailPost, viewAllPosts, updatePost, deletePost } from "../controller/postController.js"
import { uplaodImage, getImage } from '../controller/imageController.js'
import { createComment, getComments, deleteComment } from '../controller/commentController.js'
import { addUser, getUser, sendPassword } from '../controller/userController.js'
import { createMessage } from '../controller/messageController.js'
import upload from '../utils/upload.js'

const Router = express.Router()

Router.post('/create', createPost)
Router.get('/posts', viewAllPosts)
Router.get('/detail/:id', viewDetailPost)
Router.post('/update/:id', updatePost)
Router.post('/delete/:id', deletePost)

Router.post('/file/upload', upload.single('file'), uplaodImage)
Router.get('/file/:filename', getImage)

Router.post('/comments/new', createComment)
Router.get('/comments/:id', getComments)
Router.post('/comments/delete/:id', deleteComment)

Router.post('/user/signup', addUser)
Router.post('/user/signin', getUser)

Router.post('/message', createMessage)

Router.post('/resetPassword', sendPassword)

export default Router  