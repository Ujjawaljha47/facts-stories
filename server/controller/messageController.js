import Message from '../schema/messageSchema.js'


export const createMessage = async (req, res) => {
    try {
        const message = req.body
        const newMessage = new Message(message)
        await newMessage.save()
        res.status(200).json("message saved successfully")
    } catch(error) {
        res.status(500).json(error)
    }
}