import React from 'react'
import { NavLink } from 'react-router-dom';
import './RmDashboard.css'
import RmNavbar from './RmNavbar';
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { MdOutlineAssignmentReturned } from "react-icons/md";
import { MdOutlineViewTimeline } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BiMessageDetail } from "react-icons/bi";


const RmDashboard = () => {
  const id = window.location.href;
  return (
    //   <NavLink to="/" className="header">
    //   <img src="/images/logo1.png" alt="Project Fit" />
    //   <h1>Project Fit</h1>
    // </NavLink>
    <React.Fragment>
      <RmNavbar />


      <div className="sidebarr">
        {/* <NavLink to="/" className="header"> */}
        <a  href="/">
          <img  src="/images/pf1.png" alt="Project Fit" />
          </a>
        {/* </NavLink> */}

        <ul>
          <li className={id.includes("resourcemanager") && "test"}>
            <NavLink to="/resourcemanager"><GoHome className="icon" />Dashboard</NavLink>
          </li>
          <li className={id.includes("manage-employees") && "test"}><NavLink to="/manage-employees"><MdOutlinePersonAddAlt className="icon" />Manage Employee</NavLink>
          </li>
          <li className={id.includes("projectmanagerRequest") && "test"}>
            <NavLink to="/projectmanagerRequest"><BiMessageDetail className="icon" />Employee Request</NavLink>
          </li>

          <li className={id.includes("assign-projects") && "test"}>
            <NavLink to="/assign-projects"><MdOutlineAssignmentReturned className="icon" />Assign Projects</NavLink>
          </li>
          <li className={id.includes("viewprojects") && "test"}>
            <NavLink to="/viewprojects"><MdOutlineViewTimeline className="icon" />View All Projects</NavLink>
          </li><br></br><br></br><br></br>
          {/* <li>
      <NavLink to="/send-request"><TbMessage2Share className="icon"/>Send Request</NavLink>
    </li><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br> */}
          <li>
            <NavLink to="/"><RiLogoutBoxRLine className="icon" />Logout</NavLink>
          </li>
        </ul>
      </div>
      {/* <div className='content'>
        <h1>Dashboard</h1>
      </div> */}


    </React.Fragment>



  )
}
export default RmDashboard;