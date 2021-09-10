const express = require('express');
const Tasks = require('./model');
const router = express.Router();

router.get('/', async (req,res,next) => {
    try{
        const tasks = await Tasks.getAll();
        res.status(200).json(tasks)
    }
    catch(err){
        next(err)
    }
})

router.post('/', async (req,res,next) => {
    try{
        const addTask = await Tasks.addTask(req.body);
        res.status(201).json(addTask)
    }
    catch(err){
        next(err)
    }
})

module.exports = router