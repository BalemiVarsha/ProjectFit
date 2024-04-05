
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RmDashboard from './RmDashboard';
import RmNavbar from './RmNavbar';
 const EditEmp = () => {
    let{employeeId}=useParams();
    const [employeeDetails, setEmployeeDetails] = useState({
        name: '',
        email: '',
        phone: '',
        designation: '',
        department: '',
        selectedOption: '',
        status:'',
        resume:null,
      });
      useEffect(() => {
        const fetchProjectDetails = async () => {
          try {
            const response = await fetch(`http://localhost:5000/employee-data/${employeeId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch project details');
            }
            const data = await response.json();
      
            // Convert the date strings received from the API into the required format
         
      
            setEmployeeDetails(data);
          } catch (error) {
            console.error('Error fetching project details:', error);
          }
        };
      
        fetchProjectDetails();
      }, [employeeId]);
      const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeDetails({ ...employeeDetails, [name]: value });
      };  
      const handleFileChange = (e) => {
        setEmployeeDetails({ ...employeeDetails, resume: e.target.files[0] }); // Update resume in state
      };
      const handleOptionChange = (event) => {
        const { value } = event.target;
        setEmployeeDetails({ ...employeeDetails, selectedOption: value });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Send project details to the backend API
          const formData = new FormData();
         // formData.append('projectId', projectDetails.projectId);
     
         formData.append('employeeId', employeeDetails.employeeId);
         formData.append('name', employeeDetails.name);
         formData.append('email', employeeDetails.email);
         formData.append('phone',employeeDetails.phone);
         formData.append('designation', employeeDetails.designation);
         formData.append('department', employeeDetails.department);
         formData.append('selectedOption', employeeDetails.selectedOption);
         formData.append('status', employeeDetails.status);
        //  formData.append('resume', employeeDetails.resume);
    
          const response = await fetch(`http://localhost:5000/update-employee/${employeeId}`, {
            method: 'PUT',
            body: formData
          });
    
          if (response.ok) {
            console.log('Employee details updated successfully.');
            toast.success('Employee updated successfully.');
            // Handle success, e.g., show a success message to the user
          } else {
            console.error('Failed to update employee details.');
            toast.error('Failed to update employee.');
            // Handle failure, e.g., show an error message to the user
          }
        } catch (error) {
          console.error('Error updating employee details:', error);
          toast.error('Failed to update employee.');
          // Handle error, e.g., show an error message to the user
        }
      };

  return (
    <React.Fragment>
        <RmDashboard/>
        <ToastContainer />

        {/* <RmNavbar/> */}
        <div className="d-flex justify-content-center align-items-center mt-3">
        <div className="p-3 rounded w-50 border set">
          <h3 className="text-center">Update Employee</h3>
          <form className="row g-1" onSubmit={handleSubmit}>
          {/* <form className="row g-1" > */}
            <div className="col-12">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="name"
                placeholder="Enter Name"
                name="name"
                value={employeeDetails.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control rounded-0"
                id="email"
                placeholder="Enter Email"
                autoComplete="off"
                value={employeeDetails.email}
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputPhoneno" className="form-label">
                Phone Number
              </label>
              <input
                type="phonenumber"
                className="form-control rounded-0"
                id="inputPhoneno"
                placeholder="Enter Phone Number"
                pattern="^\d{10}$"
                value={employeeDetails.phone}
                name="phone"
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputSalary" className="form-label">
                Designation
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputSalary"
                placeholder="Designation"
                autoComplete="off"
                value={employeeDetails.designation}
                name="designation"
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputDepartment" className="form-label">
                Department
              </label>
              <select
                className="form-control rounded-0"
                name="department"
                value={employeeDetails.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Finance">Finance</option>
                <option value="CustomerService">Customer Service</option>
                <option value="AccountManagement">Account Management</option>
              </select>
              {/* Radio button options based on department selection */}
              {employeeDetails.department === 'Engineering' && (
                <div className="radio">
                  <label><input type="radio" name="EngineeringOptions" value="IT" onChange={handleOptionChange} /> IT</label><br />
                  <label><input type="radio" name="EngineeringOptions" value="DevOps" onChange={handleOptionChange} /> DevOps</label><br />
                  <label><input type="radio" name="EngineeringOptions" value="Q/A" onChange={handleOptionChange} /> Q/A</label><br />
                </div>
              )}
              {employeeDetails.department === 'finance' && (
                <div className="radio">
                  <label><input type="radio" name="FinanceOptions" value="Financial Engineering" onChange={handleOptionChange} /> Financial Engineering</label><br />
                  <label><input type="radio" name="FinanceOptions" value="Risk Management Engineering" onChange={handleOptionChange} /> Risk Management Engineering</label><br />
                  <label><input type="radio" name="FinanceOptions" value="Quantitative Analysis/Quantitative Finance" onChange={handleOptionChange} /> Quantitative Analysis/Quantitative Finance</label><br />
                </div>
              )}
              {employeeDetails.department === 'CustomerService' && (
                <div className="radio">
                  <label><input type="radio" name="CustomerServiceOptions" value="Customer Experience Engineering" onChange={handleOptionChange} /> Customer Experience Engineering</label><br />
                  <label><input type="radio" name="CustomerServiceOptions" value="Customer Relationship Management" onChange={handleOptionChange} /> Customer Relationship Management</label><br />
                  <label><input type="radio" name="CustomerServiceOptions" value="Service Automation Engineering" onChange={handleOptionChange} /> Service Automation Engineering</label><br />
                </div>
              )}
              {employeeDetails.department === 'AccountManagement' && (
                <div className="radio">
                  <label><input type="radio" name="AccountManagementOptions" value="Sales Engineering:" onChange={handleOptionChange} /> Sales Engineering</label><br />
                  <label><input type="radio" name="AccountManagementOptions" value="Account Management Operations" onChange={handleOptionChange} /> Account Management Operations</label><br />
                  <label><input type="radio" name="AccountManagementOptions" value="Data Analytics and Reporting" onChange={handleOptionChange} /> Data Analytics and Reporting</label><br />
                </div>
              )}
            </div>
            <div className="col-12">
              <label htmlFor="inputDepartment" className="form-label">
                Status
              </label>
              <select
                className="form-control rounded-0"
                name="status"
                value={employeeDetails.status}
                onChange={handleChange}
              >
                <option value="">Select Employee Status</option>
                <option value="Assigned">Assigned</option>
                <option value="Not Assigned">Not Assigned</option>
               
              </select></div>
            {/* <div className="col-12 mb-3">
              <label className="form-label" htmlFor="resume">
                Select Resume
              </label>
              <input
                type="file"
                className="form-control rounded-0"
                id="resume"
                name="resume"
                onChange={handleFileChange}
              />
            </div> */}
            {/* Submit button */}
            <div className="col-12">
              <button type="submit" className="editt">
                Update Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
    
  )
}
export default EditEmp;