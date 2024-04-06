const express=require('express')
const app=express()
const bodyParser = require('body-parser');
const aws =('aws-sdk')
const cors=require('cors')
const multer = require('multer');
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const cookieParser = require('cookie-parser'); 
const adminRoutes = require('./Routes/adminRoutes');
const adminloginRoute = require('./Routes/adminloginRoute');
const projectManagerRoutes = require('./Routes/projectManagerRoutes');
const projectManagerAuthRoutes = require('./Routes/pmRoute');
const employeeRoutes = require('./Routes/employeeRoutes');
const projectRoutes=require('./Routes/ProjectRoute')
const projectRequestRoutes=require('./Routes/projRequestRoute')
const { fetchProjectFile, fetchEmployeeFiles }=require('./controllers/files')
const referRoutes = require('./Routes/referRoute');

//const { parsePDFContent } = require('./pdfComparisonFunctions');
const { euclideanDistance } = require('./pdfComparisonFunctions');
app.use(cors())
app.use("/uploads",express.static("uploads"))
app.use(express.json())
app.use(cookieParser());
mongoose.connect('mongodb+srv://balemisreevarsha:sree2907@projectfit.abyjm97.mongodb.net/?retryWrites=true&w=majority&appName=ProjectFit');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(adminRoutes);
app.use(adminloginRoute);
app.use(projectManagerRoutes);
app.use(projectManagerAuthRoutes);
app.use(employeeRoutes);
app.use(projectRoutes);
app.use(projectRequestRoutes);
app.use(referRoutes);
const upload = multer();


app.post('/calculate-score', async (req, res) => {
  console.log("1-------------------------------");
  try {
    console.log("1.1-------------------------------");
    const { department, title } = req.query;
console.log("1-.2------------------------------");
    // Retrieve project and employee files based on the received data
    const projectFile = await fetchProjectFile(title); // Implement this function
    const employeeFiles = await fetchEmployeeFiles(department); // Implement this function
    console.log("2-------------------------------");
    if (!projectFile) {
      console.error('Project file not found');
      return res.status(404).json({ error: 'Project file not found' });
    }console.log("3-------------------------------");

    if (!employeeFiles || employeeFiles.length === 0) {
      console.error('Employee files not found');
      return res.status(404).json({ error: 'Employee files not found' });
    }
    console.log("4-------------------------------");
    // Perform scoring calculations for each employee
    const scores = [];
    for (const employeeFile of employeeFiles) {
      const filename = employeeFile.resume;
      const employeeId = employeeFile.employeeId;
      const score = await euclideanDistance(projectFile, filename);
      scores.push({ employeeId, score });
    }

    console.log('Scores:', scores);
    res.json({ scores });
  } catch (error) {
    console.error('Error calculating scores:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





const http=require("http");
const {Server}=require("socket.io");
const server=http.createServer(app)


const io=new Server(server,{
  cors:{
    origin:"http://localhost:5174",
    methods:["GET","POST"],
  },
})

io.on("connection",(socket)=>{
  // console.log(`User Connected:${socket.id}`);
  socket.on("send_message",(data)=>{
    // console.log(data);
    socket.broadcast.emit("receive-message",data)
  })
})


server.listen(5000,()=>{
    console.log("Server is running");
})



// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   // Join a room based on some identifier (e.g., project ID)
//   socket.on("join_room", (roomName) => {
//     socket.join(roomName);
//     console.log(`Socket ${socket.id} joined room ${roomName}`);
//   });

//   socket.on("send_message", ({ message, room }) => {
//     // Send the message only to clients in the specified room
//     io.to(room).emit("receive-message", { message });
//   });
// });





//s3 try
// app.post('/calculate-score', async (req, res) => {
//   try {
//     const { department, title } = req.query;

//     // Retrieve project and employee files based on the received data
//     const project = await Project.findOne({ title });
//     const projectId = project.projectId; // Assuming the project file path is stored in the database
//     const employeeFiles = await fetchEmployeeFiles(department);

//     if (!projectId) {
//       console.error('Project file not found');
//       return res.status(404).json({ error: 'Project file not found' });
//     }

//     if (!employeeFiles || employeeFiles.length === 0) {
//       console.error('Employee files not found');
//       return res.status(404).json({ error: 'Employee files not found' });
//     }

//     // Perform scoring calculations for each employee
//     const scores = [];
//     for (const employeeFile of employeeFiles) {
//       const filename = employeeFile.resume;
//       const employeeId = employeeFile.employeeId;
//       const score = await euclideanDistance(projectId, filename); // Pass the file URL directly
//       scores.push({ employeeId, score });
//     }

//     console.log('Scores:', scores);
//     res.json({ scores });
//   } catch (error) {
//     console.error('Error calculating scores:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });














































