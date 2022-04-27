import User from '../schema/userSchema.js'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import generator from 'generate-password'


export const addUser = async (req, res) => {
    console.log(req.body)
    const {name, email, password} = req.body
    try {
        const savedUser = await User.findOne({email: email})
        if(savedUser) {
            res.status(200).json('User already exists with the same email')
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({name, email, password: hashedPassword})
            await user.save()
            res.status(200).json('User saved successfully')
        }

    } catch(error) {
        res.status(500).json(error)
    }
}

export const getUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const savedUser = await User.findOne({email: email})
        if(!savedUser) {
            res.status(200).json('Invalid Username or Password')
        }
        else {
            const isMatched = await bcrypt.compare(password, savedUser.password)
            if(!isMatched) res.status(200).json('Invalid Username or Password')
            else res.status(200).json(savedUser)
        }

    } catch(error) {
        res.status(500).json(error)
    }
}

export const sendPassword = async (req, res) => {
    const { recoverEmail } = req.body
    try {
        const savedUser = await User.findOne({email: recoverEmail})
        if(!savedUser) {
            res.status(200).json('Please enter the currect email')
        }
        else {
            const newPassword = generator.generate({
                length: 6,
                numbers: true
            })
            const transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {
                    user: "storiesandfacts@outlook.com",
                    pass: "Stories@123"
                }
            })
            const options = {
                from: "storiesandfacts@outlook.com",
                to: recoverEmail,
                subject: "Password reset",
                text: `Your password is been reset. Your new password is: ${newPassword}`
            }
            transporter.sendMail(options, (err, info) => {
                if(err) {
                    console.log(err)
                    return
                }
                console.log('sent ' + info.response)
            })

            const hashedPassword = await bcrypt.hash(newPassword, 12)
            await User.updateOne({email: recoverEmail}, {$set: {password: hashedPassword}})
            res.status(200).json('Password is been sent to your email address')
        }
    } catch(error) {
        console.log(error)
    }
}