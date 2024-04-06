
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PmDashboard from './PmDashboard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PmNavbar from './PmNavbar';
import './AddProject.css';

const AddProjects = () => {
  const [project, setProject] = useState({
    projectId: uuidv4(),
    title: '',
    startDate: '',
    endDate: '',
    department: '',
    description: '',
    status:'',
    file:null
  });

  const handleChange = (e) => {
    const { name, value ,files } = e.target;
    let updatedValue = value;

  if (name === "startDate"|| name === "endDate") {
    const date = new Date(value);
    updatedValue = date.toISOString().split('T')[0]; // Extract only the date part
  }

  setProject({ ...project, [name]: value, file: files ? files[0] : null }); // Update file state if present
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const formData = new FormData();
      formData.append('projectId', project.projectId); 
      formData.append('file', project.file); // Append the file to FormData
      formData.append('title', project.title);
      formData.append('startDate', project.startDate);
      formData.append('endDate', project.endDate);
      formData.append('department', project.department);
      formData.append('description', project.description);
      formData.append('status', project.status);

      const response = await fetch('http://localhost:5000/api/add-projects', {
        method: 'POST',
        body: formData, 
        headers:{
         
          'Authorization': `Bearer ${token}`
      },
      });

      if (!response.ok) {
        throw new Error('Failed to add project');
      }
      toast.success('Project added successfully.');
      console.log('Project added successfully.');
      // Redirect to dashboard or other appropriate page after successful submission
    } catch (error) {
      console.error('Error adding project:', error);
      toast.error('Failed to add project.');
      // Handle error appropriately (e.g., display error message)
    }
  };

 

  return (
    <React.Fragment>
      <PmDashboard />
      <ToastContainer />
{/* <PmNavbar/> */}
      <div className="d-flex justify-content-center align-items-center mt-3">
        <div className="p-3 rounded w-50 border set">
          <h3 className="text-center">Add Project</h3>
          <form className="row g-1" onSubmit={handleSubmit}>
            <div className="col-12">
              <label htmlFor="inputName" className="form-label">
                Project Title:
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputName"
                placeholder="Enter Name"
                name="title"
                value={project.title}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="startDate" className="form-label">
                Start Date:
              </label>
              <input
                type="date"
                className="form-control rounded-0"
                id="startDate"
                name="startDate"
                value={project.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="endDate" className="form-label">
                End Date:
              </label>
              <input
                type="date"
                className="form-control rounded-0"
                id="endDate"
                name="endDate"
                value={project.endDate}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputDepartment" className="form-label">
                Department:
              </label>
              <select
                className="form-control rounded-0"
                name="department"
                value={project.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Finance">Finance</option>
                <option value="CustomerService">Customer Service</option>
                <option value="AccountManagement">Account Management</option>
              </select>
            </div> <div className="col-12">
              <label htmlFor="inputDepartment" className="form-label">
                Status
              </label>
              <select
                className="form-control rounded-0"
                name="status"
                value={project.status}
                onChange={handleChange}
              >
                <option value="">Set Project Status</option>
                <option value="Assigned">Reffered</option>
                <option value="Not Assigned">Not Reffered</option></select></div>
            <div className="col-12">
              <label htmlFor="description" className="form-label">
                Project Description:
              </label>
              <textarea
                className="form-control rounded-0"
                id="description"
                name="description"
                placeholder="Enter project description"
                rows="3"
                value={project.description}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="file" className="form-label">
                Project Detail PDF:
              </label>
              <input
                type="file"
                className="form-control rounded-0"
                id="file"
                name="file"
                accept=".pdf"
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <button type="submit" className="editt">
                Add Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddProjects;
























