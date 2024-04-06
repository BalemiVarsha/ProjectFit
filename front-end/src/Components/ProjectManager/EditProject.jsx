import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import PmDashboard from './PmDashboard';
import './AddProject.css';

const UpdateProjects = () => {
    let { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState({
  
    title: '',
    startDate: '',
    endDate: '',
    department: '',
    description: '',
   filePath: null
  });


  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/Project-data/${projectId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch project details');
        }
        const data = await response.json();
  
        // Convert the date strings received from the API into the required format
        const formattedStartDate = new Date(data.startDate).toISOString().split('T')[0];
        const formattedEndDate = new Date(data.endDate).toISOString().split('T')[0];
  
        setProjectDetails({
          ...data,
          startDate: formattedStartDate,
          endDate: formattedEndDate
        });
       
      } catch (error) {
        console.error('Error fetching project details:', error);
       
      }
    };
  
    fetchProjectDetails();
  }, [projectId]);
  


  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   setProjectDetails({
  //     ...projectDetails,
  //     [name]: name === 'file' ? files[0] : null
  //   });
  // };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let updatedValue = value;
  
    // Convert startDate and endDate to ISO date format
    if (name === "startDate" || name === "endDate") {
      const date = new Date(value);
      updatedValue = date.toISOString().split('T')[0]; // Extract only the date part
    }
  
    // Update project state
    setProjectDetails({ 
      ...projectDetails, 
      [name]: updatedValue ,
       file: files ? files[0] : null 
    });
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send project details to the backend API
      const formData = new FormData();
     // formData.append('projectId', projectDetails.projectId);
      formData.append('title', projectDetails.title);
      formData.append('startDate', projectDetails.startDate);
      formData.append('endDate', projectDetails.endDate);
      formData.append('department', projectDetails.department);
      formData.append('description', projectDetails.description);
      formData.append('filePath', projectDetails.filePath);

      const response = await fetch(`http://localhost:5000/update-project/${projectId}`, {
        method: 'PUT',
        body: formData
      });

      if (response.ok) {
        console.log('Project details updated successfully.');
        toast.success('Project updated successfully.');
        // Handle success, e.g., show a success message to the user
      } else {
        console.error('Failed to update project details.');
        toast.error('Failed to update project.');
        // Handle failure, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error updating project details:', error);
      toast.error('Failed to update project.');
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <React.Fragment>
      <PmDashboard /> <ToastContainer />

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
                value={projectDetails.title}
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
                value={projectDetails.startDate}
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
                value={projectDetails.endDate}
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
                value={projectDetails.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Finance">Finance</option>
                <option value="CustomerService">Customer Service</option>
                <option value="AccountManagement">Account Management</option>
              </select>
            </div>
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
                value={projectDetails.description}
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
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <button type="submit" className="editt">
                Update Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UpdateProjects;
