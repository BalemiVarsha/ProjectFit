// models/Project.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  filePath: {
    local: {
      type: String, // Assuming local file path is a string
      required: true
    },
    s3: {
      type: String, // Assuming S3 file path is a string
      required: true
    }
  },
  referredEmployees: [{
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  }]
}, { collection: 'Project-data' });

const Project = mongoose.model('Project-data', projectSchema);

module.exports = Project;
