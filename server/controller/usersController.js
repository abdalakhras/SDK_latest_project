const User =require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.userCreate = async (req,res) => {
    
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const role = req.body.role

    try {
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password,salt)
        const user = new User ({
            username:username,
            email:email,
            password:hashPass,
            role:role
        })
        await user.save()
        res.status(200).json({message:'user created successfully',user})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}
exports.getUsers = async (req,res) => {
    
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}
exports.userLogin = async (req,res) => {
    const email = req.body.email
    const password = req.body.password

    try {
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(401).json({message:"invalid username"})
        }
        const match = await bcrypt.compare(password,user.password)
        if(!match){
            return res.status(402).json({message:"invalid username or password"})
        }
        if(user){
            const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"}) 
            res.cookie("token",token,{
                httpOnly:true,
                maxAge:3600000
            })
             res.status(200).json({message:'login success',user,token})
               console.log('user login successfull')
        }
       
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

exports.userUpdate = async (req,res) => {
    const {username,email} = req.body
    const id = req.Authorized.id //middleWare
    try {
        const updatedUser = await User.findByIdAndUpdate(id,{username:username,email:email})
        if(!updatedUser){
          return  res.status(400).json({message:"invalid user"})
        }
        res.status(200).json({message:'updated',updatedUser})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

exports.updateuserPass = async (req,res) => {
    const {newpass,oldpass} = req.body  
    const id = req.Authorized.id // this is came from auth middleware

    try {
        const updatepass = await User.findById(id)
        const matched = await bcrypt.compare(oldpass,updatepass.password)
        if(!matched){
            return res.status(401).json({message:'old password not correct'})
        }
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(newpass,salt)
        updatepass.password = hashed
        await updatepass.save()
        res.status(200).json({message:'password updated'})
        console.log('password updated')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

exports.deleteUser = async (req,res) => {
    const id = req.params.id
    try {
        const userDelete = await User.findByIdAndDelete(id)
        res.status(200).json({message:'user deleted'})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

exports.Profile = async (req,res) => {
    const id = req.Authorized.id
    try {
        const userProfile = await User.findById(id)
    
        res.status(200).json(userProfile)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

exports.Role = async(req,res)=>{
    const id =req.Authorized.id
    try {
        const userRole = await User.findById(id)
        if(userRole.role !=='Admin'){
            console.log('you are not an Admin')
            return res.status(403).json({message:"not Authorised"})
        }
        res.status(200).json({message:'Amdin , access guranteed',userRole})
        console.log('welcome Admin')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}
exports.updateByAdmin = async (req,res) => {
const id = req.body.id
const username = req.body.username
const email = req.body.email
const role = req.body.role
    
    try {
        const updateAdmin = await User.findByIdAndUpdate(id,{username:username,email:email,role:role})
        if(!updateAdmin){
            return res.status(401).json({message:"user not found"})
        }
        res.status(200).json({message:"user updated",updateAdmin})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

exports.updatepassByAdmin = async (req,res) => {
    const id = req.body.id
    const newpass = req.body.newpass
  

    try {
        const updatePassAdmin = await User.findById(id)
        if(!updatePassAdmin){
           return res.status(401).json({message:"user not found"})
        }
      
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(newpass,salt)
        updatePassAdmin.password = hashPass
        await updatePassAdmin.save()
        res.status(200).json({message:"password updated"})
        console.log('password updated')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
    
}