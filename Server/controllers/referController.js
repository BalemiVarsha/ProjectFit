
const Referral = require('../models/Refer');
const Employee = require('../models/Employee');
const Project = require('../models/Project');
const mongoose = require('mongoose');


 

const refEmployees = async (req, res) => {
  try {
      // Extract selected employee details and project details from the request body
      const { employeesDetails, projectDetails } = req.body;

      // Perform any necessary validation or processing

    // Find the project in the database using its unique identifier
    const project = await Project.findOne({ projectId: projectDetails.projectId });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Update the referredEmployees field with the selected employees
    project.referredEmployees = employeesDetails;

    // Save the updated project to the database
    await project.save();

     
      res.status(200).json({ message: 'Data received successfully' });
  } catch (error) {
      // Handle any errors
      console.error('Error referring data:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { refEmployees };

