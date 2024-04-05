const mongoose = require('mongoose');

const projectRequestSchema = new mongoose.Schema({
  title: String,
  startDate: Date,
  endDate: Date,
  department: String,
  description: String,
  ProjectId:String
},{collection:'projectrequest'});

const ProjectRequest = mongoose.model('projectrequest', projectRequestSchema);

module.exports = ProjectRequest;


