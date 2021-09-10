const express = require('express');
const Projects = require('./model');
const router = express.Router();

router.get('/', async (req,res,next) => {
    try{
        const projects = await Projects.getAll();
        res.status(200).json(projects)
    }
    catch(err){
        next(err)
    }
})

router.post('/', async (req,res,next) => {
    try{
        const postProject = await Projects.addProject(req.body);
        res.status(201).json(postProject);
    }
    catch(err){
        next(err)
    }
})

module.exports = router