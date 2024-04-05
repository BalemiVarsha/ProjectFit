
const Project = require('../models/Project');
const {uploadToS3,retrieveFromS3}=require('../middlewares/aws_s3')

const addProject = async (req, res) => {
  
  try {
  
    const { projectId, title, startDate, endDate, department, description, status } = req.body;
    const filePath=req.file.path;
    const s3file = await uploadToS3(req.file,projectId);
    const newProject = new Project({
      projectId,
      title,
      startDate,
      endDate,
      department,
      description,
      status,
     // filePath:filePath.path
      filePath: {
        local: filePath,
        s3: s3file // Assuming s3file contains the S3 file path
      }
      // filePath:{s3:s3file,local:filePath.path}
    });
 
    
    await newProject.save();

    res.status(201).json({ message: 'Project added successfully' });
  } catch (error) {
   // res.status(500).json({ message: 'Failed to add project' });
  }
};



const getProjectData = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching project data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const getProjectCount = async (req, res) => {
  try {
    const count = await Project.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching project count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const path = require('path');


// const getProjectPDFById = async (req, res) => {
//   try {
//     const projectId = req.params.projectId; // Corrected from req.params.id to req.params.projectId
//     const project = await Project.findById(projectId); // Corrected from findOne to findById
    
//     if (!project || !project.filePath) {
//       return res.status(404).json({ message: 'PDF not found' }); // Corrected from 'Resume not found' to 'PDF not found'
//     }
    
//     const filePath = path.join(__dirname, '..', project.filePath);
//     res.sendFile(filePath);
//   } catch (error) {
//     console.error('Error accessing file:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

const updateProject = async (req, res) => {
  const { projectId } = req.params;
  const { title, startDate, endDate, department, description } = req.body;
 // const filePath = req.file ? req.file.path : null;
  try {
      // Find the project by projectId
      let project = await Project.findOne({projectId});
      
      // If project doesn't exist, return 404
      if (!project) {
          return res.status(404).json({ message: 'Project not found' });
      }

      // Update project fields
      project.title = title;
      project.startDate = startDate;
      project.endDate = endDate;
      project.department = department;
      project.description = description;
      // if (req.file) {
      //     const file = project.file; // Get the current file path
      //     if (filePath) {
      //         // If there's a previous file, delete it
      //         fs.unlinkSync(file);
      //     }
      //     // Save the new file path
      //     project.file = req.file.path;
      // }


    //  Save the updated project
      await project.save();

      res.status(200).json({ message: 'Project updated successfully', project });
  } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ message: 'Failed to update project' });
  }
};

const getProjectDetails = async (req, res) => {
  const {projectId } = req.params;
 // console.log(req.params);
  try {
    const project = await Project.findOne({ projectId });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project details:', error);
    res.status(500).json({ message: 'Failed to fetch project details' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const {projectId} = req.params; // Extract project ID from request parameters
    const project = await Project.findOneAndDelete({projectId});
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const getProjectByTitle = async (req, res) => {
  const title = req.query.title;

  try {
    const projectDetails = await Project.findOne({ title });
    if (!projectDetails) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(projectDetails);
  } catch (error) {
    console.error('Error fetching project details:', error);
    res.status(500).json({ error: 'Failed to fetch project details' });
  }
};
// const getProjectsWithEmployees = async (req, res) => {
//   try {
//     // Fetch projects and populate the 'referredEmployees' field with employee details
//     const projects = await Project.find().populate('referredEmployees');

//     res.json(projects);
//   } catch (error) {
//     console.error('Error fetching projects with employees:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// const getReferredEmployees = async (req, res) => {
//   try {
//     // Fetch referred employees from the database
//     const projects = await Project.find().populate('referredEmployees');
  
//     // Extract referred employees from projects
//     const referredEmployees = projects.reduce((acc, project) => {
//       acc.push(...project.referredEmployees);
//       return acc;
//     }, []);
  
//     // Send the referred employees data as JSON response
//     res.json(referredEmployees);
//   } catch (error) {
//     // Handle any errors
//     console.error('Error fetching referred employees:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
const postSearch = async (req, res) => {
  try {
    const searchQuery = req.body.search;
    console.log('Search Query:', searchQuery); 
    const agg = [
      {
          $search: {
              "index": "searchProject",
              "autocomplete": {
                  "query": searchQuery,
                  "path": "title",
                  "score": { "boost": { "value": 2 } }
              }
          }
      },
      {
          $match: {
              "title": {
                  $regex: `.*${searchQuery}.*`,
                  $options: "i" // Case-insensitive search
              }
          }
      }
  ];
  
      console.log('Aggregation Pipeline:', JSON.stringify(agg, null, 2)); // Log the aggregation pipeline

      const search_results = await Project.aggregate(agg);
      console.log('Search results:', search_results);
      res.status(200).json(search_results);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while searching' });
  }
};



// const postSearch = async (req, res) => {
//   try {
//       const searchQuery = req.body.search;

//       const agg = [
//           {
//               $search: {
//                   "compound": {
//                       "should": [
//                           {
//                               "text": {
//                                   "query": searchQuery,
//                                   "path": "title",
//                                   "fuzzy": {
//                                       "maxEdits": 1
//                                   }
//                               }
//                           },
//                           {
//                               "autocomplete": {
//                                   "query": searchQuery,
//                                   "path": "title"
//                               }
//                           }
//                       ],
//                       "minimumShouldMatch": 1
//                   }
//               }
//           },
//           {
//               $project: {
//                   _id: 0, // Exclude _id field from results
//                   title: 1 // Include only the title field
//               }
//           }
//       ];

//       const search_results = await Project.aggregate(agg);
//       res.status(200).json(search_results);
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'An error occurred while searching' });
//   }
// };

module.exports = { addProject,getProjectCount,getProjectData ,getProjectDetails,deleteProject,updateProject ,getProjectByTitle,postSearch};
