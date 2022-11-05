const mongoose=require('mongoose')
const Schema=mongoose.Schema

const taskSchema=new Schema({
    name:{
        type:String,
        required:[true, 'must provide name'],
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model('Task',taskSchema)