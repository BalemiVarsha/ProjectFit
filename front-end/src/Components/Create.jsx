import React from 'react'
import { NavLink } from 'react-router-dom';
import './Select.css'
const Create = () => {
  return (
    
    <div className='d-flex justify-content-center align-items-center vh-100 selectt'>
    <img className='rmimgg' src="/images/select.png"></img>
    
     <div className='p-5  w-15  loginFormm'>
         {/* <img className='imglogo' src="/images/pf1.png"></img> */}
         {/* <h2>Login Page</h2> */}
         <br></br>
         <form >
             <div className='formm'>
                <h1>Login As</h1>
               <NavLink to='/admincreation'> <button> Create Resource Manager</button></NavLink> <br></br>
                <NavLink to='/projectmanagercreation'><button>Create Project Manager</button></NavLink> 
                {/* <NavLink to='/employeelogin'><button>Employee</button></NavLink> 
                <a href='/create' className='create'>Create</a> */}
                 </div>
             
         </form>
     </div>
    
 </div>
   )
}
export default Create;