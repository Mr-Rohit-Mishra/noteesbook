const express = require('express');
const User = require('../models/User');
const router = express.Router(); 
const {body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')


const JWT_SECRET = 'rohiti$onworkmode';

//Route1: Create a User using: POST "/api/auth/createuser". Doesn't require Auth

router.post('/createuser', [
    
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter valid email').isEmail({min:3}),
    body('password','Enter a valid password').isLength({min:5}),
],async(req, res)=>{ 
    let success = false;
    //if there is any error returns bad request
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors:errors.array()});
    }


    //check wheather the user already exist with this email
    try{
        let user = await User.findOne({email: req.body.email});
        if (user){
            return res.status(400).json({success, error: "Sorry a user with this E-mail id already Exist "})
        }

        const salt = await bcrypt.genSalt(10);
        const secPass= await bcrypt.hash(req.body.password,salt);
        // create new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        //here we are using jsonwebtoken to verify user and in future is such a tempering will occoured in this site we would know that some temepering has done.

        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);


        success=true;
        res.json({success,authtoken})



    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
} )



//Route2: Verify User using: POST "/api/auth/login". Doesn't require Auth

router.post('/login', [
    
    body('email','Enter valid email').isEmail(),
    body('password','password cannot be blank').exists(),
],async(req, res)=>{ 
    let success = false;
    //if there is any error returns bad request
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const{email,password}= req.body;
    try{
        let user = await User.findOne({email});

        if(!user){
            success=false;
            return res.status(400).json({error:"please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success = false;
            return res.status(400).json({success, error: "please try to login with correct credentials"});
        }

        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success= true;
        res.json({success, authtoken})



    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
} )



// Route3: Get User Credentials after Login into the website

router.post('/getuser',fetchuser, async(req,res)=> {
    
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)


    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})


module.exports = router

