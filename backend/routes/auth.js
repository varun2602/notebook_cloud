const express = require("express")
const router = express.Router()
const User = require("../models/Users.js")
const { body, validationResult } = require('express-validator');

router.post("/",[
   body("name", "Name is required").notEmpty(),
   body("password","Password must be atleast 5 characters").isLength({min:3}),
   body("email","Invalid email format").isEmail()
]

, function(req, res){
   
   const result = validationResult(req);
   
   if (result.isEmpty()) {
      const user = User(req.body)
      user.save()
      obj = {
         "message":"Data created successfully"
      }
      return res.json(obj)
     
   }
 
   res.json({ errors: result.array() });
   // res.json({"response":"Data received!"})
   
})

module.exports = router