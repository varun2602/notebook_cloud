const express = require("express")
const router = express.Router()
const User = require("../models/Users.js")
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var JWT_SECRET = "VARUN_K"

router.post("/",[
   body("name", "Name is required").notEmpty(),
   body("password","Password must be atleast 5 characters").isLength({min:3}),
   body("email","Invalid email format").isEmail()
]

, async function(req, res){
   
   const result = validationResult(req);
   
   if (result.isEmpty()) {
      const user = new User(req.body)
      // check if user already exists  
      const user_exists = await User.findOne({"email":req.body.email})
      console.log(user_exists)
      if(user_exists){
         return res.status(400).json({"message":"A user with the email id already exists!"})
      }
      // console.log(user)
      await user.save()

      // JWT 
      data = {
         user:{
            id:user.id
         }
      }
      // console.log(data)
      var token = jwt.sign(data, JWT_SECRET);
      // console.log(token)
      obj = {
         "message":"Data created successfully"
      }
      return res.json({token})
     
   }
 
   res.json({ errors: result.array() });
   // res.json({"response":"Data received!"})
   
})

module.exports = router