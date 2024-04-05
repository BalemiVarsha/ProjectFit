const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId:{
    type:String,
    required:true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  selectedOption: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  resume: {
    type: String, // Assuming storing file path as string
    required: true
  }
},{collection:'employee-data'});

const Employee = mongoose.model('Employee-data', employeeSchema);

module.exports = Employee;
