import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import RmDashboard from './RmDashboard';
import { useLocation } from 'react-router-dom';
import './ManageEmployee.css';
import RmNavbar from './RmNavbar';

const ManageEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const highlightedContentRef = useRef(null);

  useEffect(() => {
    fetchEmployeeData();
  }, [searchQuery,employees]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('searchQuery');
    setSearchQuery(query || '');
  }, [location.search]);

  const fetchEmployeeData = async () => {
    try {
      const response = await fetch('http://localhost:5000/employee-data');
      if (!response.ok) {
        throw new Error('Failed to fetch employee data');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };
  const handleViewResume = async (employeeId) => {
    try {
      window.open(`http://localhost:5000/employee-data/${employeeId}/pdf`, '_blank');
    } catch (error) {
      console.error('Error viewing project PDF:', error);
    }
  };
  const highlightText = (text) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };
  const handleDelete = async (employeeId) => {
        try {
          const response = await fetch(`http://localhost:5000/employee-data/${employeeId}`, {
            method: 'DELETE'
          });
          if (!response.ok) {
            throw new Error('Failed to delete employee');
          }
          // Remove the deleted project from the state
          setEmployees(employees.filter(employee => employee._id !== employeeId));
          console.log('Employee deleted successfully');
        } catch (error) {
          console.error('Error deleting employee:', error);
        }
      };

  const filteredEmployees = () => {
    let filtered = employees;
    if (searchQuery) {
      const regex = new RegExp(`(${searchQuery})`, 'gi');
      filtered = filtered.map(employee => ({
        ...employee,
        name: highlightText(employee.name),
        email: highlightText(employee.email),
        phone: highlightText(employee.phone),
        designation: highlightText(employee.designation),
        department: highlightText(employee.department),
        selectedOption: highlightText(employee.selectedOption)
      }));
    }
    return filtered;
  };

  return (
    <React.Fragment>
      <RmDashboard />
      <div className="container">
        <h2> Employees</h2>
        <NavLink to='/addEmployee'><button className='addemp'>Add Employee</button></NavLink>
        {/* <div className="search-containerr">
          <label className='searchemp'>
            Search Employee
            <input
              type="text"
              placeholder="Search..."
              className="search-barr"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
        </div> */}

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Category</th>
              <th>Status</th>
              <th>Resume</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees().map(employee => (
              <tr key={employee._id}>
                <td dangerouslySetInnerHTML={{ __html: employee.name }}></td>
                <td dangerouslySetInnerHTML={{ __html: employee.email }}></td>
                <td dangerouslySetInnerHTML={{ __html: employee.phone }}></td>
                <td dangerouslySetInnerHTML={{ __html: employee.designation }}></td>
                <td dangerouslySetInnerHTML={{ __html: employee.department }}></td>
                <td dangerouslySetInnerHTML={{ __html: employee.selectedOption }}></td>
                <td style={{
                  color: !employee.status ? 'green' : 'blue',
                  borderRadius: '18px'  // Adjust the value as needed for the desired roundness
                }}>
                  {employee.status}
                </td>

                <td> <button className='resume' onClick={() => handleViewResume(employee._id)}> Resume </button>   </td>
                {/* <td><button className='editbtu'>Edit</button><button className='delt'> Delete </button> </td><br></br> */}
                <td>  <NavLink to={`/update-employee/${employee.employeeId}`}>
                  <button className='editbtu'>Edit</button>
                </NavLink>
                  <button className='delt' onClick={() => handleDelete(employee.employeeId)}> Delete </button></td>

              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default ManageEmployee;
























