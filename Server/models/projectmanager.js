const mongoose=require('mongoose')
const ProjectManager=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true}
},{collection:'projectmanager-data'})
const model=mongoose.model('ProjectManager-Data',ProjectManager)
module.exports=model