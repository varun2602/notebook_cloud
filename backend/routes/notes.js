const express = require("express")
const router = express.Router()
const Notes = require("../models/Notes")
const fetchuser = require("../middleware/fetchUser")
const {body, validationResult} = require("express-validator")

router.get("/fetchallnotes", fetchuser, async function(req,res){
    const notes = await Notes.find({user:req.user.id})
    res.json(notes)
})

router.post("/addnote",[
    body("title", "Enter a valid title with minimum length 3").isLength({min:3}),
    body("description", "Enter a valid description with minimum length 5").isLength({min:5})
], fetchuser, async function(req,res){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }   
    try{   
    const {title, description, tag} = req.body 
    const note = new Notes({
        title, description, tag, users:req.user.id
    }) 
    
    const savedNote = await note.save()
    return res.json(savedNote)
}
catch(error){
    console.log("error", error)
    return res.status(500).json({"error":"Internal server error"})
}
})

router.post("/updatenote", fetchuser, [
    body("title", "Enter a valid title with minimum length 3").isLength({min:3}),
    body("description", "Enter a valid description with minimum length 5").isLength({min:5})
], async function(req, res){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const {title, description, tag} = req.body
        try{ 
        const note = await  Notes.findOne({"title":title})
        note.description = description,
        note.tag  = tag 
        const savedUpdatednote = await note.save()
        return res.json(savedUpdatednote)
        
        }
        catch(error){
            console.error(error)
            return res.status(500).json({"message":"Internal server error"})
        }
    }
    catch(error){
         return res.status(500).json({"message":"Internal server error"})
    }
})

router.post("/deletenote", fetchuser, async function(req, res){
    const {title} = req.body 
    const note = await Notes.findOne({"title":title})
    await note.deleteOne()
    return res.json({"message":"Deleted successfully"})
})
module.exports = router