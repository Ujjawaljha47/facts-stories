import Comment from "../schema/commentSchema.js"

export const createComment = async (req, res) => {
    try {
        const comment = new Comment(req.body)
        await comment.save()

        res.status(200).json('Comment saved successfully')
    } catch(error) {
        res.status(500).json(error)
    }
}

export const getComments = async (req, res) => {
    try {
        let comments = await Comment.find({postId: req.params.id})
        return await res.status(200).json(comments)
    } catch(error) {
        res.status(500).json(error)
    }
}

export const deleteComment = async (req, res) => {
    try {
        let comment = await Comment.findById(req.params.id)
        await comment.delete()
    } catch(error) {
        res.status(500).json(error)
    }
}