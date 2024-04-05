import React, { useState, useEffect,useRef } from 'react';
import io from 'socket.io-client';

import { Link } from 'react-router-dom';
import PmDashboard from './PmDashboard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

import './AllProjects.css';






const socket=io.connect("http://localhost:5000")



const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation(); 
  const highlightedContentRef = useRef(null);// Default filter: all projects
  // const[message,setMessage]=useState("");
  useEffect(() => {
    fetchProjectData();
  }, [projects]);
  useEffect(() => {
    fetchProjectData();
    const params = new URLSearchParams(location.search);
    const query = params.get('searchQuery');
    setSearchQuery(query || ''); // Set the search query from URL parameters
  }, [location.search]);
  const fetchProjectData = async () => {
    try {
     // const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/Project-data');
      if (!response.ok) {
        throw new Error('Failed to fetch project data');
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };
  const splitDateByT = (date) => {
    return date.split('T')[0];
};

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // const filteredProjects = () => {
 
  //   if (filter === 'referred') {
  //     return projects.filter(project => project.referredEmployees && project.referredEmployees.length > 0);
  //   } else if (filter === 'nonReferred') {
  //     return projects.filter(project => !project.referredEmployees || project.referredEmployees.length === 0);
  //   } else {
  //     return projects; // Show all projects when no filter applied
  //   }
  
  // };
  const filteredProjects = () => {
    let filtered = projects;
    if (filter === 'referred') {
      filtered = projects.filter(project => project.referredEmployees && project.referredEmployees.length > 0);
    } else if (filter === 'nonReferred') {
      filtered = projects.filter(project => !project.referredEmployees || project.referredEmployees.length === 0);
    }
    // Apply search query filter
    if (searchQuery) {
      const regex = new RegExp(`(${searchQuery})`, 'gi');
      filtered = filtered.map(project => ({
        ...project,
        title: project.title.replace(regex, '<mark>$1</mark>') // Highlight search query in title
      }));
    }
    return filtered;
  };
  const scrollToHighlightedContent = () => {
    if (searchQuery) {
      const highlightedContent = document.querySelector('.highlighted-content');
      if (highlightedContent) {
        highlightedContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
  const viewProjectPdf = async (projectId) => {

    try {
      window.open(`http://localhost:5000/Project-data/${projectId}/pdf`, '_blank');
    } catch (error) {
      console.error('Error viewing project PDF:', error);
    }
  };

  useEffect(() => {
    scrollToHighlightedContent();
  }, [projects, searchQuery]);

  const handleSendRequest = async (project) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/send-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json','Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(project)
      });
      if (!response.ok) {y
        throw new Error('Failed to send request');
      }
      toast.success('Request Sent Successfully.');
      console.log('Project request sent successfully');
    } catch (error) {
      toast.error('Failed to send request.');
      console.error('Error sending project request:', error);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      const response = await fetch(`http://localhost:5000/Project-data/${projectId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete project');
      }
      setProjects(projects.filter(project => project._id !== projectId));
      console.log('Project deleted successfully');
      toast.success('Project deleted successfully.');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project.');
    }
  };
  // const notify=()=>{
  //     socket.emit("send_message",{message:'You have new Employee Request'})
  // }
  const notify = (projectTitle) => {
    socket.emit("send_message", { message: `You have a new employee request for the project: ${projectTitle}` });
  };
  
  return (
    <React.Fragment>
      <PmDashboard />
      <ToastContainer />
      {/* <PmNavbar/> */}
      <div className="filter-container">
        <div className='filt'>
          <label  htmlFor="filter">Filter:</label>
          <select id="filter" value={filter} onChange={handleFilterChange}>
            <option value="all">All Projects</option>
            <option value="referred">Referred Projects</option>
            <option value="nonReferred">Non-Referred Projects</option>
          </select>
        </div></div>
      <div className="container">
     
        <h2>Project List</h2>
        
        <div className="project-container">
          {filteredProjects().map((project) => (
            // <div key={project._id} className="project-box">
            <div key={project._id} className={`project-box ${searchQuery && project.title.includes(searchQuery) ? 'highlighted-content' : ''}`}>
              <div className="project-details">
                {/* <h3>{project.title}</h3> */}
                <h3 dangerouslySetInnerHTML={{ __html: project.title }}></h3>
                <div className="view-pdf-button">
                  <button onClick={() => viewProjectPdf(project.projectId)}>View PDF</button>
                </div>
                <p><strong>Start Date:</strong> {splitDateByT(project.startDate)}</p>
                <p><strong>End Date:</strong> {splitDateByT(project.endDate)}</p>
                <p><strong>Department:</strong> {project.department}</p>
                <p><strong>Description:</strong> {project.description}</p>
                {/* <p><strong>Status:</strong> {project.status}</p> */}
                <ul>
                  {project.referredEmployees && project.referredEmployees.map((employeeId) => (
                    <div key={employeeId}>
                      <EmployeeDetails employeeId={employeeId} />
                    </div>
                  ))}
                </ul>
              </div>
              <div className="optionss">
                <Link to={`/update-project/${project.projectId}`}>
                  <button className="btn btn-outline-success editbtnn">Edit</button>
                </Link><br/>
                <button className="btn btn-outline-success deltt" onClick={() => handleDelete(project.projectId)}>Delete</button><br/>
                {/* <button className="btn btn-outline-success request" onClick={() => handleSendRequest(project)}>Send Request</button> */}
                {/* <button className="btn btn-outline-success request" onClick={() => { handleSendRequest(project); notify(); }}>Send Request</button> */}
                <button className="btn btn-outline-success request" onClick={() => { handleSendRequest(project); notify(project.title); }}>Send Request</button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

const EmployeeDetails = ({ employeeId }) => {
  const [employeeDetails, setEmployeeDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/employees/${employeeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch employee details');
        }
        const details = await response.json();
        setEmployeeDetails(details);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchDetails();
  }, [employeeId]);

  if (!employeeDetails) {
    return <div>Loading employee details...</div>;
  }

  const handleViewResume = async (employeeId) => {
    try {
      window.open(`http://localhost:5000/employee-data/${employeeDetails._id}/pdf`, '_blank');
    } catch (error) {
      console.error('Error viewing employee resume:', error);
    }
  };

  return (
    <div className='employee'>
      <strong>Name:</strong> {employeeDetails.name}<br />
      <strong>Email:</strong> {employeeDetails.email}<br />
      <strong>Phone:</strong> {employeeDetails.phone}<br />
      <strong>Designation:</strong> {employeeDetails.designation}<br />
      <strong>Department:</strong> {employeeDetails.department}<br />
      <strong>Category:</strong> {employeeDetails.selectedOption}<br/>
      <strong>Status:</strong> {employeeDetails.status}<br />
      <p><button className='resumee' onClick={() => handleViewResume(employeeDetails.employeeId)}> Resume </button> </p>
    </div>
  );
};

export default AllProjects;

























































































































































