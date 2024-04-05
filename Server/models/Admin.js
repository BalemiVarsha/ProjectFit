const mongoose=require('mongoose')
const Admin=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true}
},{collection:'admin-data'})
const model=mongoose.model('Admin-Data',Admin)
module.exports=model

// // models/Admin.js

// const mongoose = require('mongoose');

// const adminSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// }, { collection: 'admin-data' });

// const Admin = mongoose.model('Admin', adminSchema);

// module.exports = Admin;
