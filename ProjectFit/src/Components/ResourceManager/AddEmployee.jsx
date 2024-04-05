import React, { useState,useRef,useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RmDashboard from './RmDashboard';
import './AddEmployee.css';
import RmNavbar from './RmNavbar';


const AddEmployee = () => {
 
  const [employee, setEmployee] = useState({
    employeeId: uuidv4(),
    name: '',
    email: '',
    password:'',
    phone: '',
    designation: '',
    department: '',
    selectedOption: '',
    status:'',
    resume:null,
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setEmployee({ ...employee, [name]: value });
  // };

  const handleOptionChange = (event) => {
    const { value } = event.target;
    setEmployee({ ...employee, selectedOption: value });
  };
  const handleFileChange = (e) => {
    setEmployee({ ...employee, resume: e.target.files[0] }); // Update resume in state
  };


  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password:'',
    phone: '',
    designation: '',
    department: '',
    selectedOption: '',
    status: '',
    resume: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = '';

    switch (name) {
      case 'name':
        error = value.trim() === '' ? 'Name is required.' : '';
        break;
      case 'email':
        error = value.trim() === '' ? 'Email is required.' : '';
        break;
        case 'password':
        error = value.trim() === '' ? 'Password is required.' : '';
        break;
      case 'phone':
        error = value.trim() === '' ? 'Phone number is required.' : (value.length !== 10 ? 'Phone number should be 10 digits.' : '');
        break;
      case 'designation':
        error = value.trim() === '' ? 'Designation is required.' : '';
        break;
      case 'department':
        error = value === '' ? 'Department is required.' : '';
        break;
      case 'selectedOption':
        error = value === '' ? 'Option is required.' : '';
        break;
      case 'status':
        error = value === '' ? 'Status is required.' : '';
        break;
      default:
        break;
    }

    setErrors({ ...errors, [name]: error });
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log(token);
    // Check if there are any errors before submitting
    const errorValues = Object.values(errors);
    if (errorValues.some(error => error !== '')) {
      alert('Please fill out all the fields correctly.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('employeeId', employee.employeeId);
      formData.append('name', employee.name);
      formData.append('email', employee.email);
      formData.append('password', employee.password);
      formData.append('phone', employee.phone);
      formData.append('designation', employee.designation);
      formData.append('department', employee.department);
      formData.append('selectedOption', employee.selectedOption);
      formData.append('status', employee.status);
      formData.append('resume', employee.resume);

      const response = await fetch('http://localhost:5000/api/addEmployee', {
        method: 'POST',
        body: formData,
        headers:{
         
          'Authorization': `Bearer ${token}`
      },
      });

      if (!response.ok) {
        throw new Error('Failed to add employee');
      
      }
      toast.success('Employee added successfully.');
      console.log('Employee added successfully.');
      // alert("Employee added successfully.");
      setEmployee({
        employeeId: uuidv4(),
        name: '',
        email: '',
        password:'',
        phone: '',
        designation: '',
        department: '',
        selectedOption: '',
        status:'',
        resume: null,
      });
    } catch (error) {
      console.error('Error adding employee:', error);
      toast.error('Failed to add employee.');
    }
  };

    


  return (
    <React.Fragment>
      <RmDashboard />
      <ToastContainer />
      {/* <RmNavbar/> */}
      <div className="d-flex justify-content-center align-items-center mt-3">
        <div className="p-3 rounded w-50 border set">
          <h3 className="text-center">Add Employee</h3>
          <form className="row g-1" onSubmit={handleSubmit}>
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
                value={employee.name}
                onChange={handleChange}
              />  {errors.name && <div className="text-danger">{errors.name}</div>}
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
                value={employee.email}
                name="email"
                onChange={handleChange}
              />  {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <div className="col-12">
              <label htmlFor="email" className="form-label">
                Password
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="password"
                placeholder="Enter Password"
                autoComplete="off"
                value={employee.password}
                name="password"
                onChange={handleChange}
              />  {errors.password && <div className="text-danger">{errors.password}</div>}
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
                value={employee.phone}
                name="phone"
                onChange={handleChange}
              />   {errors.phone && <div className="text-danger">{errors.phone}</div>}
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
                value={employee.designation}
                name="designation"
                onChange={handleChange}
              /> {errors.designation && <div className="text-danger">{errors.designation}</div>}
            </div>
            <div className="col-12">
              <label htmlFor="inputDepartment" className="form-label">
                Department
              </label>
              <select
                className="form-control rounded-0"
                name="department"
                value={employee.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Finance">Finance</option>
                <option value="CustomerService">Customer Service</option>
                <option value="AccountManagement">Account Management</option>
              </select>
              {errors.department && <div className="text-danger">{errors.department}</div>}
              {/* Radio button options based on department selection */}
              {employee.department === 'Engineering' && (
                <div className="radio">
                  <label><input type="radio" name="EngineeringOptions" value="IT" onChange={handleOptionChange} /> IT</label><br />
                  <label><input type="radio" name="EngineeringOptions" value="DevOps" onChange={handleOptionChange} /> DevOps</label><br />
                  <label><input type="radio" name="EngineeringOptions" value="Q/A" onChange={handleOptionChange} /> Q/A</label><br />
                </div>
              )}
              {employee.department === 'Finance' && (
                <div className="radio">
                  <label><input type="radio" name="FinanceOptions" value="Financial Engineering" onChange={handleOptionChange} /> Financial Engineering</label><br />
                  <label><input type="radio" name="FinanceOptions" value="Risk Management Engineering" onChange={handleOptionChange} /> Risk Management Engineering</label><br />
                  <label><input type="radio" name="FinanceOptions" value="Quantitative Analysis/Quantitative Finance" onChange={handleOptionChange} /> Quantitative Analysis/Quantitative Finance</label><br />
                </div>
              )}
              {employee.department === 'CustomerService' && (
                <div className="radio">
                  <label><input type="radio" name="CustomerServiceOptions" value="Customer Experience Engineering" onChange={handleOptionChange} /> Customer Experience Engineering</label><br />
                  <label><input type="radio" name="CustomerServiceOptions" value="Customer Relationship Management" onChange={handleOptionChange} /> Customer Relationship Management</label><br />
                  <label><input type="radio" name="CustomerServiceOptions" value="Service Automation Engineering" onChange={handleOptionChange} /> Service Automation Engineering</label><br />
                </div>
              )}
              {employee.department === 'AccountManagement' && (
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
                value={employee.status}
                onChange={handleChange}
              >
                <option value="">Select Employee Status</option>
                <option value="Assigned">Assigned</option>
                <option value="Not Assigned">Not Assigned</option>
               
              </select>  {errors.status && <div className="text-danger">{errors.status}</div>}</div>
            <div className="col-12 mb-3">
              <label className="form-label" htmlFor="resume">
                Select Resume
              </label>
              <input
                type="file"
                className="form-control rounded-0"
                id="resume"
                name="resume"
                accept=".pdf"
                onChange={handleFileChange}
              />
            </div>
            {/* Submit button */}
            <div className="col-12">
              <button type="submit" className="editt">
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddEmployee;

