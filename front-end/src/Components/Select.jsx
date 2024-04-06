import React from 'react'
import { NavLink } from 'react-router-dom';
import './Select.css'
const Select = () => {
  return (
   <React.Fragment>
     {/* <img  src="/images/pf1.png" alt="Project Fit" /> */}
    <div className='d-flex justify-content-center align-items-center vh-100 selectt'>
    <img className='rmimgg' src="/images/select.png"></img>
    
     <div className='p-5  w-15  loginFormm'>
         {/* <img className='imglogo' src="/images/pf1.png"></img> */}
         {/* <h2>Login Page</h2> */}
         <br></br>
         <form >
             <div className='formm'>
                <h1>Login As</h1>
               <NavLink to='/adminlogin'> <button>Resource Manager</button></NavLink> <br></br>
                <NavLink to='/projectmanagerlogin'><button>Project Manager</button></NavLink> 
                <NavLink to='/employeelogin'><button>Employee</button></NavLink> 
                <a href='/create' className='create'>Create</a>
                 </div>
             
         </form>
     </div>
    
 </div>
 </React.Fragment>
    // <div className='main'>
       
    //     <div>
    //       <NavLink to='/adminlogin'> <img src='/images/3.png'></img></NavLink> 
        
    //     </div>
    //     <div>
    //       <NavLink to='/projectmanagerlogin'> <img src='/images/4.png'></img></NavLink> 
    //     </div>
    // </div>
  )
}
export default Select;