import React from 'react'
import { NavLink} from 'react-router-dom';
import './PmDashboard.css'
import PmNavbar from './PmNavbar';

import { GoHome } from "react-icons/go";

import { TbDeviceIpadDown } from "react-icons/tb";

import { MdOutlineViewTimeline } from "react-icons/md";
import { TbMessage2Share } from "react-icons/tb";
import { RiLogoutBoxRLine } from "react-icons/ri";

 const PmDashboard = () => {
  const id  = window.location.href;
  return (
  //   <NavLink to="/" className="header">
  //   <img src="/images/logo1.png" alt="Project Fit" />
  //   <h1>Project Fit</h1>
  // </NavLink>
  <React.Fragment>
    <PmNavbar/>
  
    
     <div className="sidebar">
     {/* <NavLink to="/" className="header">
    <img src="/images/pf1.png" alt="Project Fit" />
  
  </NavLink> */}
  <a  href="/">
          <img  src="/images/pf1.png" alt="Project Fit" />
          </a>
  <ul>
  <li className={id.includes("dashboard") && "test"}>
      <NavLink to="/dashboard"><GoHome className="icon"/>Dashboard</NavLink>
    </li>
    <li className={id.includes("add-projects") && "test"}><NavLink to="/add-projects"><TbDeviceIpadDown className="icon"/>Add Project</NavLink>
    </li>
    <li className={id.includes("all-projects") && "test"}>
      <NavLink to="/all-projects"><MdOutlineViewTimeline className="icon"/>View All Projects</NavLink>
    </li>
    <li className={id.includes("send-request") && "test"}>
      <NavLink to="/send-request"><TbMessage2Share className="icon"/>Send Request</NavLink>
    </li> 
    {/* <li className={id.includes("referrals") && "test"}>
      <NavLink to="/referrals"><TbMessage2Share className="icon"/>Referrals</NavLink>
    </li> */}
    <br></br><br></br><br></br><br></br><br></br><br></br>
    <li>
      <NavLink to="/"><RiLogoutBoxRLine className="icon"/>Logout</NavLink>
    </li>
  </ul>
</div>


  </React.Fragment>
   
 

  )
}
export default PmDashboard;