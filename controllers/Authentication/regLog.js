const AuthModel = require('../../models/RegLog/reglog')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



const Register = async(req,res)=>{


    try{

        const {name,email,contact,company,role,password} = req.body

        if(!name || !email || !contact || !company || !role || !password){

            return res.status(StatusCodes.BAD_REQUEST).json({msg:'please fill all the fields'})
        }

        const newUser = await AuthModel.create(req.body)

        return res.status(StatusCodes.CREATED).json({msg:'user created successfully', newUser})


    }

    catch(err){

        console.log(err)
        res.status(StatusCodes.INTRNAL_SERVER_ERROR).json({msg:'Something went wrong, try again later'})


    }
    
}


const Login =(req,res)=>{

    res.send('login')
}




module.exports = {Register,Login}