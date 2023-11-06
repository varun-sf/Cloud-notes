const express = require("express");
const notesRouter = express.Router();

 const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');

notesRouter.get("/fetchallnotes",fetchuser,async (req,res)=>{
    try{
const notes = await Notes.find({user: req.user.id});
res.send(notes);
    }
    catch(err){
        console.log(err);

    }

})
notesRouter.post("/addnotes",fetchuser,[ 
body('title', "Enter a valid title").isLength({min:3}),
body('description', 'Description must have a minimum of 5 characters').isLength({ min: 5 }),],async (req,res)=>{
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({"errors":result.array()})
    }

try {
    const note = await Notes.create({
        title: req.body.title,
        description: req.body.description,
        user: req.user.id
    })
    res.send(note);
} catch (error) {
   console.log(error); 
}

})


module.exports = notesRouter;