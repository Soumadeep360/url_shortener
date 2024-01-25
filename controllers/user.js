const { v4: uuidv4 } = require('uuid');
const {setUser,getUser}=require('../service/auth');
const User=require('../models/user');

async function handleUserSignUp(req,res){
    const {name,email,password}=req.body;
    await User.create({name,email,password});
    return res.redirect('/');   
}
async function handleUserLoginUp(req,res){
    const {email,password}=req.body;
    const user = await User.findOne({email,password});
    if(!user){
        return res.render("login",{
            error:"Invalid Username or Password",
        })
    }
    // const sessionID=uuidv4();
    const token=setUser(user);
    res.cookie('token',token);
    return res.redirect('/') ;   
}

module.exports={
    handleUserSignUp,handleUserLoginUp
};

