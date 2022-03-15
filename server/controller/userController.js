import User from '../schema/userSchema.js'
import bcrypt from 'bcryptjs'

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