import React, { useState, useEffect } from 'react';
import EmpDashboard from './EmpDashboard';
// import PmNavbar from './PmNavbar';
import './EmpdashB.css'

const EmpDashB = () => {
    const [employeeCount, setEmployeeCount] = useState(0);
    const [projectCount, setProjectCount] = useState(0);
    const [reqestCount, setRequestCount] = useState(0);
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        // Fetch employee count from MongoDB collection
        const fetchEmployeeCount = async () => {
            try {
                const response = await fetch('http://localhost:5000/employee-count');
                if (!response.ok) {
                    throw new Error('Failed to fetch employee count');
                }
                const data = await response.json();
                setEmployeeCount(data.count);
            } catch (error) {
                console.error('Error fetching employee count:', error);
            }
        };

        // Fetch project count from MongoDB collection
        const fetchProjectCount = async () => {
            try {
                const response = await fetch('http://localhost:5000/project-count');
                if (!response.ok) {
                    throw new Error('Failed to fetch project count');
                }
                const data = await response.json();
                setProjectCount(data.count);
            } catch (error) {
                console.error('Error fetching project count:', error);
            }
        };
        const fetchRequestCount = async () => {
            try {
                const response = await fetch('http://localhost:5000/request-count');
                if (!response.ok) {
                    throw new Error('Failed to fetch project count');
                }
                const data = await response.json();
                setRequestCount(data.count);
            } catch (error) {
                console.error('Error fetching project count:', error);
            }
        };
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:5000/Project-data');
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchEmployeeCount();
        fetchProjectCount();
        fetchRequestCount();
        fetchProjects();
    }, []);
    const viewProjectPdf = async (projectId) => {

        try {
          window.open(`http://localhost:5000/Project-data/${projectId}/pdf`, '_blank');
        } catch (error) {
          console.error('Error viewing project PDF:', error);
        }
      };
      const splitDateByT = (date) => {
        return date.split('T')[0];
    };

    return (
        <React.Fragment>
            <EmpDashboard />

            <div className='dashboard-container '>
                <div className='dash'>
                    <div className="box1">
                        <h4>Employee Count</h4>
                        <p>{employeeCount}</p>

                    </div>
                    <div className="box2">
                        <h4>Project Count</h4>
                        <p>{projectCount}</p>
                    </div>
                    <div className="box1">
                        <h4>Request Count</h4>
                        <p>{reqestCount}</p>
                    </div>
                </div>
            </div>
            <div>
                <h2 className='dashB'>Projects</h2>
                <div className="table-container">
                    <table className="project-table">
                        <thead>
                            <tr>
                                {/* <th>ID</th> */}
                                <th>Title</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Department</th>
                                <th>Description</th>
                                <th>Status</th>
                                {/* <th>Document</th> */}
                                {/* Add more columns as needed */}
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(project => (
                                <tr key={project.projectId}>
                                    {/* <td>{project.projectId}</td> */}
                                    <td>{project.title}</td>
                                    <td>{splitDateByT(project.startDate)}</td> {/* Splitting and displaying start date */}
                                <td>{splitDateByT(project.endDate)}</td> {/* Splitting and displaying end date */}
                                    <td>{project.department}</td>
                                    <td>{project.description}</td>
                                    <td>{project.referredEmployees.length > 0 ? "Referred" : "Not Referred"}</td>
                                    {/* <tb><button className="pdf" onClick={() => viewProjectPdf(project.projectId)}>View PDF</button></tb> */}
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </React.Fragment>
    );
};


export default EmpDashB;