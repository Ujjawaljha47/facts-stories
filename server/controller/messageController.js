import Message from '../schema/messageSchema.js'
import nodemailer from 'nodemailer'


export const createMessage = async (req, res) => {
    try {
        const message = req.body
        const newMessage = new Message(message)
        await newMessage.save()

        const transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
                user: "storiesandfacts@outlook.com",
                pass: "Stories@123"
            }
        })
        const options = {
            from: "storiesandfacts@outlook.com",
            to: "nitishrai9795@gmail.com",
            subject: "User feedback",
            text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nMobile: ${req.body.mobile}\nMessage: "${req.body.message}"`
        }
        transporter.sendMail(options, (err, info) => {
            if(err) {
                console.log(err)
                return
            }
            console.log("Sent " + info.response)
        })
        res.status(200).json("message saved successfully")
    } catch(error) {
        res.status(500).json(error)
    }
}
