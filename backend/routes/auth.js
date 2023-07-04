const express = require("express")
const router = express.Router()
const User = require("../models/Users.js")
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
var JWT_SECRET = "VARUN_K"

// Create a user 
router.post("/create_user",[
   body("name", "Name is required").notEmpty(),
   body("password","Password must be atleast 5 characters").isLength({min:3}),
   body("email","Invalid email format").isEmail()
]

, async function(req, res){
   // Express validator validation 
   const result = validationResult(req);
   
   if (result.isEmpty()) {
      // Creating user from received data
      //   Hashing password  
      var salt = bcrypt.genSaltSync(10);
      var hashed_password = bcrypt.hashSync(req.body.password, salt);
      obj_received = {
         "name":req.body.name,
         "email":req.body.email,
         "password":hashed_password
      }
      const user = new User(obj_received)
      // check if user already exists  
      const user_exists = await User.findOne({"email":req.body.email})
      console.log(user_exists)
      if(user_exists){
         return res.status(400).json({"message":"A user with the email id already exists!"})
      }
      // console.log(user)
      await user.save()
      const response = {
         "message":"User registered successfully!"
      }
      return res.json(response)

      // JWT 
      // data = {
      //    user:{
      //       id:user.id
      //    }
      // }
      // console.log(data)
      // var token = jwt.sign(data, JWT_SECRET);
      // console.log(token)
      // obj = {
      //    "message":"Data created successfully"
      // }
      // return res.json({token})
     
   }
   // error message if validation fails 
   res.json({ errors: result.array() });
   // res.json({"response":"Data received!"})
   
})
// Login endpoint 
router.get("/login_user",[
   body("password","Password must be atleast 5 characters").isLength({min:3}),
   body("email","Invalid email format").isEmail(),

], async function(req, res){
// checking for validation errors 
const errors = validationResult(req)
if(!errors.isEmpty()){
   return res.status(400).json({errors:errors.array()})
}
const {email, password} = req.body 
try {
   let user = await User.findOne({email})
   // console.log(user)
   if(!user){
      // console.log("User does not exists")
      return res.status(400).json({error:"Invalid credentials"})
      
   }
   const passwordCompare = bcrypt.compareSync(password, user.password)
   if(!passwordCompare){
      // console.log(passwordCompare,"Passwords do not match")
      return res.status(400).json({error:"Invalid credentials"})
   }
   data = {
      user:{
         id:user.id
      }
   }
   var token = jwt.sign(data, JWT_SECRET) 
   return res.json({token})

   
}
catch(error){
   console.error(error)
   return res.status(500).json({error:"Some error occurred"})
}
})

module.exports = router