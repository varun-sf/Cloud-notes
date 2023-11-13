const express = require("express");
const notesRouter = express.Router();

 const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');

notesRouter.get("/fetchallnotes",fetchuser,async (req,res)=>{
    try{
const notes = await Notes.find({user: req.user.id});
res.json(notes);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");

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



notesRouter.put("/updatenote/:id",fetchuser,async(req,res)=>{
  const{title,description,tag} = req.body;
  const newnote={};
  if(title){newnote.title = title};
  if(description){newnote.description=description};
  if(tag){newnote.tag = tag};

  const note = await Notes.findById(req.params.id);
  if(!note){res.status(404).send("Not found")}

  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed");
  }
  const notedisp = await Notes.findByIdAndUpdate(req.params.id, {$set:newnote},{new:true})
  res.send(notedisp)
})


notesRouter.delete("/deletenote/:id",fetchuser,async(req,res)=>{
   
  
    const note = await Notes.findById(req.params.id);
    if(!note){res.status(404).send("Not found")}
  
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
    }
    const notedisp = await Notes.findByIdAndDelete(req.params.id)
    res.send({"msg":"Successfully deleted"})
  })
module.exports = notesRouter;