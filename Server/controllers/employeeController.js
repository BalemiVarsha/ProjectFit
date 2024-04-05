//const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
//const uniqid = require("uniqid");
const path = require('path');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
//const { uploadToS3 } = require('../middlewares/multerMiddleware');
const addEmployee = async (req, res) => {
  try {
    const { employeeId,name, email,password, phone, designation, department, selectedOption,status } = req.body;
    const resumeFile = req.file;
    //console.log('Resume file path:', resumeFile.path);
    const newEmployee = new Employee({
      employeeId,
      name,
      email,
      password,
      phone,
      designation,
      department,
      selectedOption,
      status,
      resume: resumeFile.path
     // Store the S3 file URL
    });

    // Save the new employee to the database
    await newEmployee.save();
   // const count = await Employee.countDocuments();
    res.status(201).json({ message: 'Employee added successfully' });
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ message: 'Failed to add employee' });
  }

}
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find employee by email
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(401).json({ message: 'Invalid credentials - Employee not found' });
    }

    // Check if password matches
    if (password !== employee.password) {
      return res.status(401).json({ message: 'Invalid credentials - Incorrect password' });
    }

    // Generate JWT token
    const token = jwt.sign({ employeeId: employee.employeeId }, 'server123', { expiresIn: '1h' });

    // Respond with token and employee ID
    res.json({ message: 'Login successful', token, employeeId: employee.employeeId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find employee by email
//     const employee = await Employee.findOne({ email });

//     if (!employee) {
//       return res.status(401).json({ message: 'Invalid credentials - Employee not found' });
//     }

//     console.log('Stored Password:', employee.password);
//     console.log('Request Password:', password);

  
//     if (password !== employee.password) {
//       return res.status(401).json({ message: 'Invalid credentials - Incorrect password' });
//     }

  
//     const token = jwt.sign({ employeeId: employee.employeeId }, 'server123', { expiresIn: '1h' });

   
//     res.cookie('token', token, { maxAge: 3600000 }); // Expires in 1 hour

  
//     res.json({ message: 'Login successful', token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
const getEmployeeCount = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching employee count:', error);
    res.status(500).json({ error: 'Failed to fetch employee count' });
  }
};
// const getEmpData = async (req, res) => {//not using
//   try {
//     // Extract employeeId from the token
//     const decodedToken = jwt.verify(req.headers.authorization.split(' ')[1], 'server123');
//     const employeeId = decodedToken.employeeId;

//     // Find employee by employeeId
//     const employee = await Employee.findOne({ employeeId });

//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     // Respond with employee data
//     res.json({ employee });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
const getEmployeeDetails = async (req, res) => {
  const {employeeId } = req.params;
 // console.log(req.params);
  try {
    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching employee details:', error);
    res.status(500).json({ message: 'Failed to fetch employee details' });
  }
};
const deleteEmployee = async (req, res) => {
  try {
    const {employeeId} = req.params; // Extract project ID from request parameters
    const employee = await Employee.findOneAndDelete({employeeId});
    console.log(employee);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Assuming you have an Employee model defined in your backend



const getEmployeeById = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching employee by ID:', error);
    res.status(500).json({ message: 'Failed to fetch employee' });
  }
};
const getDepartments = async (req, res) => {
  try {
    const departments = await Employee.distinct('department');
    res.json({ departments });
  } catch (error) {
    console.error('Error fetching department:', error);
    res.status(500).json({ error: 'Failed to fetch department' });
  }
};
const getEmployeeData = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employee data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateEmployee = async (req, res) => {
  const {employeeId}=req.params;
  const { name, email, phone, designation, department, selectedOption,status } = req.body;

   try{
      let employee=await Employee.findOne({employeeId});
      if(!employee){
          return res.status(404).json({ message: 'Employee not found' });
      }

    employee.name=name;
    employee.email=email;
    employee.phone=phone;
    employee.designation=designation;
    employee.department=department;
    employee.selectedOption=selectedOption;
    employee.status=status;

  //   if (req.file) {
  //     const file = employee.file; // Get the current file path
  //     if (resume) {
  //         // If there's a previous file, delete it
  //         fs.unlinkSync(file);
  //     }
  //     // Save the new file path
  //     employee.file = req.file.path;
  // }
   

  await employee.save();

  res.status(200).json({ message: 'Employee updated successfully', employee });
   }catch(error){

      console.error('Error updating employee details:', error);
      res.status(500).json({ message: 'Failed to update employee' });
        


   }

}

const getEmployeeResumePDF = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const employee = await Employee.findById(employeeId);
    
    if (!employee || !employee.resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    const filePath = path.join(__dirname, '..', employee.resume);
    res.sendFile(filePath);
  } catch (error) {
    console.error('Error accessing file:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const empSearch = async (req, res) => {
  try {
    const searchQuery = req.body.search;
    console.log('Search Query:', searchQuery); 
    const agg = [
      {
          $search: {
              "index": "SearchEmployee",
              "autocomplete": {
                  "query": searchQuery,
                  "path": "name",
                  "score": { "boost": { "value": 2 } }
              }
          }
      },
      {
          $match: {
              "name": {
                  $regex: `.*${searchQuery}.*`,
                  $options: "i" // Case-insensitive search
              }
          }
      }
  ];
  
      console.log('Aggregation Pipeline:', JSON.stringify(agg, null, 2)); // Log the aggregation pipeline

      const search_results = await Employee.aggregate(agg);
      console.log('Search results:', search_results);
      res.status(200).json(search_results);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while searching' });
  }
};

module.exports = { addEmployee,login,getEmployeeCount,updateEmployee ,deleteEmployee,getEmployeeDetails,getEmployeeById,getDepartments,getEmployeeData,getEmployeeResumePDF,empSearch};































































  // export async function POST(req) {
  //   const formData = await req.formData();

  //   if (formData.has('file')) {
  //     const file = formData.get('file');

  //     const s3Client = new S3Client({
  //       region: 'ap-south-1',
  //       credentials: {
  //         accessKeyId: process.env.AWS_ACCESSKEYID,
  //         secretAccessKey: process.env.AWS_SECREATEACCESSKEY,
  //       },
  //     });

  //     const randomId = uniqid();
  //     const ext = file.name.split('.').pop();
  //     const newFilename = randomId + '.' + ext;
  //     const bucketName = process.env.AWS_BUCKETNAME;

  //     const chunks = [];
  //     for await (const chunk of file.stream()) {
  //       chunks.push(chunk);
  //     }

  //     await s3Client.send(new PutObjectCommand({
  //       Bucket:process.env.AWS_BUCKETNAME,
  //       Key: newFilename,
  //       ACL: 'public-read',
  //       Body: Buffer.concat(chunks),
  //       ContentType: file.type,
  //     }));

  //     const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;

  //     return Response.json(link);

  //   }
  // }



// const AWS = require('aws-sdk');
// const Employee = require('../models/Employee');
// const dotenv = require('dotenv');
// const upload = require('../middlewares/multerMiddleware');
// const fs = require('fs');
// // Load environment variables from .env file
// dotenv.config();

// // AWS.config.update({
// //   accessKeyId: process.env.AWS_ACCESSKEYID,
// //   secretAccessKey: process.env.AWS_SECRETACCESSKEY,
// //   region: process.env.AWS_REGION
// // });

// // const s3 = new AWS.S3();

// const addEmployee = async (req, res) => {
//   try {
//     const { name, email, phone, designation, department, selectedOption } = req.body;
//     // const resume = req.file; // Assuming resume is uploaded as a file
//     // if (!resume) {
//     //   return res.status(400).json({ message: 'No file uploaded' });
//     // }

//     // // Read the file from the file system
//     // const resumeData = fs.readFileSync(resume.path);
//     // const params = {
//     //   Bucket: process.env.AWS_BUCKETNAME,
//     //   Key: process.env.AWS_ACCESSKEYID, // Unique key for the file in S3
//     //   ACL: 'public-read',
//     //   Body: resumeData, // Use req.file.buffer as the Body
//     //   ContentType: 'application/pdf', // Set the content type explicitly for PDF// Use resume.mimetype instead of file.type
//     // };

//     // const uploadResult = await s3.upload(params).promise();
//     // const resumeUrl = uploadResult.Location;

//     // Create a new employee instance
//     const newEmployee = new Employee({
//       name,
//       email,
//       phone,
//       designation,
//       department,
//       selectedOption,
//       resume: resumeUrl // Store the S3 file URL
//     });

//     // Save the new employee to the database
//     await newEmployee.save();

//     res.status(201).json({ message: 'Employee added successfully' });
//   } catch (error) {
//     console.error('Error adding employee:', error);
//     res.status(500).json({ message: 'Failed to add employee' });
//   }
// };

// module.exports = { addEmployee };




































