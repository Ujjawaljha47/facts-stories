import Post from  '../schema/postSchema.js'

export const createPost = async (req, res) => {
    try {
        const post = req.body
        const newPost = new Post(post)
        await newPost.save()
        res.status(200).json('blog saved successfully')
    } catch(error) {
        res.status(500).json(error)
    }
}
export const viewAllPosts = async (req, res) => {
    let username = req.query.username
    let category = req.query.category
    let post
    try {
        if(username) post = await Post.find({username: username})
        else if(category) post = await Post.find({category: category})
        else post = await Post.find({})
        return await res.status(200).json(post)
    } catch(error) {
        res.status(500).json(error)
    }
}
export const viewDetailPost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id)
        return await res.status(200).json(post)
    } catch(error) {
        res.status(500).json(error)
    }
}
export const updatePost = async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, { $set: req.body })

        res.status(200).json({message: "blog updated successfully"})
    } catch(error) {
        res.status(500).json(error)
    }
}
export const deletePost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id)
        await post.delete()
    } catch(error) {
        res.status(500).json(error)
    }
}
