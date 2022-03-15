const User = require("../models/userModel")
const bcrypt = require("bcrypt")

module.exports.register = async(req, res, next) => {

    try {
        const {username, email, password} = req.body

    const usernameCheck = await User.findOne({ username })
    const emailCheck = await User.findOne({ email })
    const hashedPassword = await bcrypt.hash(password, 10)

    if(usernameCheck){
        return res.json({msg: "Username already used", status: false})
    }

    if(emailCheck) {
        return res.json({msg: "Email already used", status: false})
    }

    const user = await User.create({
        email,
        username,
        password: hashedPassword,

    })

    delete user.password;
    return res.json({status: true, user})
    }catch (err) {
        next(err)
    }
    



}


module.exports.login = async(req, res, next) => {

    try {
        const {username, password} = req.body

    const user = await User.findOne({ username })

    const hashedPassword = await bcrypt.hash(password, 10)

    if(!user){
        return res.json({msg: "Incorrect username or password", status: false})
    }

    const isPasswordValide = await bcrypt.compare(password, user.password)

    if(!isPasswordValide){
        res.json({msg: "Incorrect username or password", status: false})
    }


    return res.json({status: true, user})
    }catch (err) {
        next(err)
    }
    



}


module.exports.getAllUsers = async(req, res, next) => {

    try {

        const users = await User.find({_id: {$ne: req.params.id}}).select([
            "email", "username", "_id",
        ])
        return res.json(users)

    } catch(err) {
        next(err)
    }


}