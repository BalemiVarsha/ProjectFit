// Assuming you have a Project model and Employee model defined using Mongoose

const Project = require('../models/Project');
const Employee = require('../models/Employee'); 
const {uploadToS3,retrieveFromS3}=require('../middlewares/aws_s3')
// Function to fetch the project file based on the provided project title
async function fetchProjectFile(title) {
    console.log('Fetching project file for title:', title);
    const project = await Project.findOne({ title });
   // console.log('Project found:', project); 
    
    if (!project || !project.filePath) {
      console.error('Project file not found'); 
      throw new Error('Project file not found');
    }
       
    console.log('Project file path:', project.filePath);
    return project.filePath.local;
  }

async function fetchEmployeeFiles(department) {
  
  const employees = await Employee.find({ department });
  

  const employeeFiles = employees.map(employee => {
    return {
      employeeId: employee._id,
      resume: employee.resume 
    };
  });
  
  return employeeFiles;
}

module.exports = { fetchProjectFile, fetchEmployeeFiles };
