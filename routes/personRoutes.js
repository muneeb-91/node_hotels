const express = require('express');
const router = express.Router();
const person = require('./../models/person');

// Post method for person endpoint
router.post('/', async (req, res) =>{
try{
    const data = req.body // req.body contains the parsed data by the body parser

  //Create a new Person document using the mongoose model
  const newPerson = new person(data);

  // Save the new person to the database
  const response = await newPerson.save();
  console.log('Data Successfully Saved!');
  res.status(200).json(response);
}catch(err){
  console.log(err);
  res.status(500).json({error: 'Internal Server Error!'});
}
})

// Get Method to see the person data
router.get('/', async(req, res)=>{
  try{
    const data = await person.find();
    console.log('Data fetched!')
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error!'});
  }
})

// Parameterized API calls for person
router.get('/:workType', async (req, res) => {
  try{
    const workType = req.params.workType;
    if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
      const response = await person.find({work: workType});
      console.log('Response Fetched!')
      res.status(200).json(response);
    }
    else{
      res.status(404).json({error: 'invalid worktype!'});
    }
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'internal server error'});
  }
})

router.put('/:id', async (req, res) => {
  try{
    const personId = req.params.id;
    const updatedPersonData = req.body;
    
    const response = await person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true, // Returns the updated document
      runValidators: true // Run Mongoose Validations
    });

    if(!response){
      res.status(404).json({error: 'User not found!'});
    }

    console.log('Data Updated!');
    res.status(200).json(response);
  }catch(err){
    console.log(error);
    res.status(500).json({error: "Internal Server Error!"});
  }
})

router.delete('/:id', async (req, res) =>{
  try{
    const personId = req.params.id;
    const response = await person.findByIdAndDelete(personId);

    if(!response){
      res.status(404).json({error: "User not found!"});
    }
    else{
      console.log("Document is deleted successfully!");
      res.status(200).json(response);
    }
  }catch(err){
    console.log(error);
    res.status(500).json({error: "Internal server error!"});
  }
})


module.exports = router;