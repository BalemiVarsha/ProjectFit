const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const { addEmployee,login,getEmployeeCount,updateEmployee,deleteEmployee,getEmployeeDetails ,getEmployeeById,getDepartments,getEmployeeData,getEmployeeResumePDF,empSearch} = require('../controllers/employeeController')
//const empCount = require('../controllers/empCount');
const { authenticateToken } = require('../middlewares/auth');
//const empUpdate = require('../controllers/empUpdate');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
router.post('/employeelogin',login);
//router.get('/employeedata',getEmpData);
router.get('/employee-count', getEmployeeCount);
router.get('/employee-data',getEmployeeData);
router.get('/employees/:employeeId', getEmployeeById);
router.get('/department',getDepartments);
router.get('/employee-data/:employeeId', getEmployeeDetails);
router.post('/api/addEmployee', upload.single('resume'),authenticateToken, addEmployee);
router.get('/employee-data/:employeeId/pdf',getEmployeeResumePDF)
router.put('/update-employee/:employeeId', upload.single('file'),updateEmployee);
router.delete('/employee-data/:employeeId', deleteEmployee);
router.post('/searchemployee',authenticateToken,empSearch)

module.exports = router;





















































































// router.get('/employee-data', async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     res.json(employees);
//   } catch (error) {
//     console.error('Error fetching employee data:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
// router.get('/employee-data/:employeeId/pdf', async (req, res) => {
//   try {
//     const { employeeId } = req.params;
//     const employee = await Employee.findById(employeeId);
    
//     if (!employee || !employee.resume) {
//       return res.status(404).json({ message: 'Resume not found' });
//     }
    
//     const filePath = path.join(__dirname, '..', employee.resume);
//     res.sendFile(filePath);
//   } catch (error) {
//     console.error('Error accessing file:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });



// router.get('/department', async (req, res) => {
//   try {
//     const departments = await Employee.distinct('department'); // Fetching distinct titles from the projectrequest collection
//     res.json({ departments });
//   } catch (error) {
//     console.error('Error fetching department:', error);
//     res.status(500).json({ error: 'Failed to fetch department' });
//   }
// });










// try {
//   const { projectId } = req.params;
//   const project = await Project.findById(projectId);
  
//   if (!project || !project.file) {
//     return res.status(404).json({ message: 'Resume not found' });
//   }
  
//   const filePath = path.join(__dirname, '..', project.file);
//   res.sendFile(filePath);
// } catch (error) {
//   console.error('Error accessing file:', error);
//   res.status(500).json({ message: 'Internal server error' });
// }
// });

// const express = require('express');
// const router = express.Router();
// const Employee = require('../models/Employee');
// const { addEmployee } = require('../controllers/employeeController');
// const multer = require('multer');
// const path = require('path');
// const fs=require('fs')

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Set upload directory
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   // Check file type or other conditions here
//   if (file.mimetype === 'application/pdf') {
//     cb(null, true); // Accept file
//   } else {
//     cb(new Error('File type not supported'), false); // Reject file
//   }
// };

// const upload = multer({ storage: storage, fileFilter: fileFilter }); // Initialize multer with storage and fileFilter

// router.post('/api/addEmployee', upload.single('resume'), addEmployee);

// router.get('/employee-data', async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     res.json(employees);
//   } catch (error) {
//     console.error('Error fetching employee data:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
// router.get('/employee-data/:employeeId/pdf', (req, res) => {
//   const { employeeId } = req.params; 
//   const filePath = path.join(__dirname, '..', 'uploads', `${employeeId}.pdf`);

//   // Check if the file exists
//   fs.access(filePath, fs.constants.F_OK, (err) => {
//     if (err) {
//       console.error('Error accessing file:', err);
//       return res.status(404).json({ message: 'Resume not found' });
//     }
//     // File exists, send it to the client
//     res.sendFile(filePath);
//   });
// });


// module.exports = router;








// const express = require('express');
// const router = express.Router();
// //const { uploadToS3 } = require('../middlewares/multerMiddleware');
// const Employee = require('../models/Employee');
// const { addEmployee } = require('../controllers/employeeController');
// const multer = require('multer'); // Import multer for file uploads
// const upload = multer({ dest: 'uploads/' }); // Set upload directory


// // router.post('/api/addEmployee',addEmployee);
// router.post('/api/addEmployee',upload.single('resume'),addEmployee);

// router.get('/employee-data', async (req, res) => {
//     try {
//       const employees = await Employee.find();
//       res.json(employees);
//     } catch (error) {
//       console.error('Error fetching employee data:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });
// module.exports = router;







































