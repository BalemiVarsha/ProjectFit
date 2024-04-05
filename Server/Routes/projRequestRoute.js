const express = require('express');
const ProjectRequest = require('../models/ProjectRequest');
const router = express.Router();
const multer = require('multer');
const { saveProjectRequest,getRequestCount,deleteReqProject,getProjectRequests,getDistinctTitles} = require('../controllers/projRequestController');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Dest folder for storing uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});
const upload = multer({ storage: storage});
router.get('/request-count',getRequestCount)
router.post('/api/send-request',upload.single('file'),saveProjectRequest);
router.delete('/send-request/:projectId',deleteReqProject);
router.get('/api/send-request', getProjectRequests);
router.get('/titles', getDistinctTitles);
// router.get('/api/send-request', async (req, res) => {
//     try {
//       const projectreq= await ProjectRequest.find();
//       res.json(projectreq);
//     } catch (error) {
//       console.error('Error fetching project data:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });
  // router.get('/titles', async (req, res) => {
  //   try {
  //     const titles = await ProjectRequest.distinct('title'); // Fetching distinct titles from the projectrequest collection
  //     res.json({ titles });
  //   } catch (error) {
  //     console.error('Error fetching titles:', error);
  //     res.status(500).json({ error: 'Failed to fetch titles' });
  //   }
  // });
  // router.get('/projectrequest', async (req, res) => {
  //   const title = req.query.title;
  //   try {
  //     const projectDetails = await ProjectRequest.findOne({ title });
  //     if (!projectDetails) {
  //       return res.status(404).json({ error: 'Project not found' });
  //     }
  //     res.json(projectDetails);
  //   } catch (error) {
  //     console.error('Error fetching project details:', error);
  //     res.status(500).json({ error: 'Failed to fetch project details' });
  //   }
  // });
  
  // router.get('/api/send-request:id/pdf', async (req, res) => {
  //   try {
  //    const { id } = req.params;
  //    const project = await ProjectRequest.findById(id);
     
  //    if (!project || !project.filePath) {
  //      return res.status(404).json({ message: 'Resume not found' });
  //    }
     
  //    const filePath = path.join(__dirname, '..', project.filePath);
  //    res.sendFile(filePath);
  //  } catch (error) {
  //    console.error('Error accessing file:', error);
  //    res.status(500).json({ message: 'Internal server error' });
  //  }
  //    });





module.exports = router;

