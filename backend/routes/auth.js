const express = require("express");
const authRouter = express.Router();
const bcrypt = require('bcryptjs');

const User = require("../models/User");
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRECT = "Varunsecret"


authRouter.post("/create-user",[  body('name', 'Enter a valid name').isLength({ min: 3 }),
body('email', "Enter a valid Email").isEmail(),
body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),],async (req,res)=>{
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({"success":success,"errors":result.array()})
    }
   
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt)

    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      }).then(user=> res.send({"success":!success,user}))
      .catch(err=>res.send({"Error":err.message}));
 
    
    
})


authRouter.post("/login",[ 
body('email', "Enter a valid Email").isEmail(),
body('password', 'Password cannot be blank').exists(),],async (req,res)=>{
    let success= false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(100).send({"success": success,"errors":result.array()})
    }
   
    const {email,password} = req.body;
    
    try{
      const user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error: "Please try to login with correct credentials"});
      }

     const passwordCompare = await bcrypt.compare(password,user.password);
     if(!passwordCompare){
        return res.status(400).json({"success":success,error: "Please try to login with correct credentials"});
     }

     const payload ={
        user:{
            id: user.id
        }
     }
     const authtoken = jwt.sign(payload,JWT_SECRECT);
     res.json({
        "success": !success,
        "authtoken": authtoken
     })

    }
    catch(err){
        console.log(err);
       res.status(500).send("Please try again later, server error!");
    }
 
})


authRouter.get('/getuser',fetchuser,async(req,res)=>{
    try {
        const userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        res.send(user)
    } catch (error) {
        
            console.log(err);
           res.status(500).send("Please try again later, server error!");
        
    }
})

module.exports = authRouter;