const express=require('express')
const router=express.Router()
const {getAllTasks,addTask,updateTask,deleteTask,getTask}=require('../controllers/tasksController')
router.route('/')
.get(getAllTasks)
.post(addTask)
.put(updateTask)
.delete(deleteTask)

router.route('/:id')
.get(getTask)

module.exports=router