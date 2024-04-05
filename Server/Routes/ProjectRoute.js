// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const Project = require('../models/Project')
const { addProject,getProjectCount,getProjectData ,getProjectDetails,deleteProject,updateProject,getProjectByTitle,getReferredEmployees,getProjectPDFById  ,postSearch } = require('../controllers/projectController');
//const projCount = require('../controllers/projCount');

const { authenticateToken } = require('../middlewares/auth');
//const  {UploadMiddleWares}=require('../middlewares/multerMiddleware')
const multer = require('multer');
const path = require('path');
const fs=require('fs');
// const retrieveFromS3 = require('../middlewares/aws_s3');
const {uploadToS3,retrieveFromS3}=require('../middlewares/aws_s3')// const { postSearch } = require('..');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Dest folder for storing uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const upload = multer({ storage: storage});

// Route for adding a new project
router.post('/api/add-projects', upload.single('file'),authenticateToken, addProject);
router.get('/Project-data',getProjectData);
router.get('/project-count', getProjectCount);
router.get('/Project-data/:projectId',getProjectDetails);
// router.get('/projects',getProjectsWithEmployees);
//router.get('/referred-employees',getReferredEmployees);
router.get('/project',getProjectByTitle );
router.put('/update-project/:projectId',upload.single('file'),updateProject);

router.delete('/Project-data/:projectId', deleteProject);

router.post('/search',authenticateToken,postSearch);

//router.get('/Project-data/:projectId/pdf',getProjectPDF );


router.get('/Project-data/:projectId/pdf', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const project = await Project.findOne({ projectId });

    if (!project || !project.filePath || !project.filePath.s3) {
      return res.status(404).json({ message: 'Project not found or file path missing' });
    }

    // Retrieve the file from S3
    const fileData = await retrieveFromS3(projectId);

    // Set Content-Type header
    res.setHeader('Content-Type', 'application/pdf');

    // Send the file data
    res.write(fileData);
    res.end();
  } catch (error) {
    console.error('Error retrieving file:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;



































// router.get('/Project-data/:projectId/pdf', async (req, res) => {
//   try {
//    const  projectId  = req.params.projectId;
//    console.log("===========>"+projectId)
//    const project = await Project.findOne({projectId});
//    console.log(project)
//    if (!project || !project.filePath) {
//      return res.status(404).json({ message: 'Resume not found' });
//    } 
//    const filePath = path.join(__dirname, '..', project.filePath.local);
//    console.log('filepath',filePath)
//    res.sendFile(filePath);
//  } catch (error) {
//    console.error('Error accessing file:', error);
//    res.status(500).json({ message: 'Internal server error' });
//  }
//    });

// router.get('/Project-data/:projectId/pdf', async (req, res) => {
//   try {
//     const projectId = req.params.projectId;
//     const project = await Project.findOne({ projectId });

//     if (!project || !project.filePath.s3) {
//       return res.status(404).json({ message: 'Project not found' });
//     }

//     // Retrieve the file from S3
//     const fileData = await retrieveFromS3(projectId);

    
//     res.setHeader('Content-Type', 'application/pdf');
//     // Send the file data
//     res.send(fileData);
//   } catch (error) {
//     console.error('Error retrieving file:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


// router.get('/Project-data/:projectId/pdf', async (req, res) => {
//   try {
//     const projectId = req.params.projectId;
//     const project = await Project.findOne({ projectId });

//     if (!project || !project.filePath) {
//       return res.status(404).json({ message: 'Project not found' });
//     }

//     // Redirect the user to the S3 URL where the PDF file is stored
//     res.redirect(project.filePath);
//   } catch (error) {
//     console.error('Error redirecting to file:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });





































































// router.get('/Project-data', async (req, res) => {
//     try {
//       const projects= await Project.find();
//       res.json(projects);
//     } catch (error) {
//       console.error('Error fetching project data:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });

  // router.get('/project', async (req, res) => {
  //   const title = req.query.title;
  //  // console.log(title);
  //   try {
  //     const projectDetails = await Project.findOne({ title });
  //     if (!projectDetails) {
  //       return res.status(404).json({ error: 'Project not found' });
  //     }
  //     res.json(projectDetails);
  //   } catch (error) {
  //     console.error('Error fetching project details:', error);
  //     res.status(500).json({ error: 'Failed to fetch project details' });
  //   }
  // });
 
  // router.get('/referred-employees', async (req, res) => {
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
  // });

  // router.get('/Project-data/:projectId', async (req, res) => {
  //   const { projectId } = req.params;
  //   try {
  //     const project = await Project.findOne({ projectId });
  //     if (!project) {
  //       return res.status(404).json({ message: 'Project not found' });
  //     }
  //     res.status(200).json(project);
  //   } catch (error) {
  //     console.error('Error fetching project details:', error);
  //     res.status(500).json({ message: 'Failed to fetch project details' });
  //   }
  // });
  



// router.get('/Project-data', async (req, res) => {
//     try {
//       const projects= await Project.find();
//       res.json(projects);
//     } catch (error) {
//       console.error('Error fetching project data:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });