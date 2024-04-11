const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser')
const {body, validationResult } = require('express-validator');


//Route1: fetch user data using GET: "/api/notes/fetchallnotes" . login required

router.get('/fetchallnotes', fetchuser, async (req,res)=>{
    try {
        const notes = await Notes.find({user: req.user.id});
    res.json(notes)

    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})


//Route2: fetch user data and add notes using POST: "/api/notes/addnotes" . login required

router.post('/addnote', fetchuser,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Description must be atleast 5 character').isLength({min:3}),], async (req,res)=>{
    try {

       const {title,description,tag} =req.body;

        //if there is any error returns bad request
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        const note = new Notes({
            title,description,tag,user: req.user.id
        })

        const savedNote = await note.save()
        res.json(savedNote)

    } catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
    }
})



//Route3: Update user data using Put: "/api/notes/updatenotes" . login required
router.put('/updatenotes/:id', fetchuser, async (req,res)=>{
        const {title, description, tag} = req.body;
try {
    

        //create new object by updating old one
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
        

   
    // find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString ()!== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});

} catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
    }
})


//Route4: Delete user data using delete: "/api/notes/deletenotes" . login required
router.delete('/deletenotes/:id', fetchuser, async (req,res)=>{
    const {title, description, tag} = req.body;
try {
   
        
    // find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    // Allow only If User is authenticated as the creater of this data
    if(note.user.toString ()!== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"success":"Note Has Been Deleted", note:note});

} catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
    }
})





module.exports = router