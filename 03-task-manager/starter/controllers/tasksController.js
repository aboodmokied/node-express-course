const Task=require('../model/Task')

const getAllTasks=async (req,res)=>{
    const tasks=await Task.find()
    if(tasks.length===0){
        return res.json({"message":"No Tasks Found."})
    }
    res.status(200).json(tasks)
}

const addTask=async(req,res)=>{
    if(!req?.body?.name)return res.status(400).json({"message":'name is required'})
    const {name}=req.body
    try{
        const result=await Task.create({
            name,
        })
        res.status(201).json(result)
    }catch(err){
        console.error(err)
    }
}


const updateTask=async(req,res)=>{
    if(!req?.body?.id)return res.status(400).json({"message":'Id is required'})
    const id=req.body.id
    try{
    const task=await Task.findById(id)
    if(!task)return res.json({"message":`Task with id ${id} is not found.`})
    const {name,isCompleted}=req.body
    if(name)task.name=name
    if(isCompleted)task.isCompleted=isCompleted
    const result=await task.save()
    res.status(200).json(result)
    }catch(err){
                
        res.sendStatus(500)
    }
}

const deleteTask=async(req,res)=>{
    if(!req?.body?.id)return res.status(400).json({"message":'Id is required'})
    const id=req.body.id
    try{
    const task=await Task.findById(id)
    if(!task)return res.json({"message":`Task with id ${id} is already not found.`})
    const result=await task.deleteOne()
    res.json(result)
    }catch(err){
            
        res.sendStatus(500)
    }
}

const getTask=async(req,res)=>{
    if(!req?.params?.id)return res.status(400).json({"message":'Id is required'})
    const id=req.params.id
    try{

        const task=await Task.findById(id)
        if(!task)return res.json({"message":`Task with id ${id} is not found.`})
        res.json(task)
    }catch(err){
        
        res.sendStatus(500)
    }
    
}

module.exports={
    getAllTasks,
    addTask,
    updateTask,
    deleteTask,
    getTask
}