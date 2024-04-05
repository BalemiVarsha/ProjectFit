import React, { useState, useEffect } from 'react';
import PmDashboard from './PmDashboard';

const Referrals = () => {
  const [projectDetails, setProjectDetails] = useState(null);
  const [referredEmployees, setReferredEmployees] = useState([]);

  // Function to fetch project details and referred employees data
  useEffect(() => {
    fetchProjectDetails(); // Call the function to fetch project details
    fetchReferredEmployees(); // Call the function to fetch referred employees data
  }, []); // Empty dependency array to ensure the effect runs only once

  // Function to fetch project details
  const fetchProjectDetails = async () => {
    try {
      const response = await fetch('/project'); // Fetch project details from the backend
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json(); // Parse the response data
      setProjectDetails(data); // Set the project details state variable
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };

  // Function to fetch referred employees data
  const fetchReferredEmployees = async () => {
    try {
      const response = await fetch('/referred-employees'); // Fetch referred employees data from the backend
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json(); // Parse the response data
      setReferredEmployees(data); // Set the referred employees state variable
    } catch (error) {
      console.error('Error fetching referred employees:', error);
    }
  };

  return (
    <React.Fragment>
      {/* <PmDashboard /> */}
      {projectDetails && (
        <div className="project-details">
          <h2>Project Details</h2>
          <p>Project ID: {projectDetails.projectId}</p>
          <p>Title: {projectDetails.title}</p>
          <p>Start Date: {projectDetails.startDate}</p>
          <p>End Date: {projectDetails.endDate}</p>
          <p>Department: {projectDetails.department}</p>
          <p>Description: {projectDetails.description}</p>
        </div>
      )}

      {referredEmployees.length > 0 && (
        <div className="referred-employees">
          <h2>Referred Employees</h2>
          <ul>
            {referredEmployees.map(employee => (
              <li key={employee._id}>
                <p>Name: {employee.name}</p>
                <p>Email: {employee.email}</p>
                <p>Phone Number: {employee.phone}</p>
                {/* Add more employee details as needed */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};

export default Referrals;
