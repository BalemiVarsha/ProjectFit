import React ,{useState}from 'react';
import './Login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImGoogle3 } from "react-icons/im";
import { FaFacebook } from "react-icons/fa6";
import { AiFillTwitterCircle } from "react-icons/ai";
// import jwt from 'jsonwebtoken';
import {Link} from 'react-router-dom'

const AdminLogin = () => {

  const[username,setUsername]=useState(' ');
  const[password,setPassword]=useState(' ');
  async function admin(event){
      event.preventDefault()
     
  
      const response =await fetch('http://localhost:5000/api/adminlogin',{
          method:'POST',
          headers:{
              'Content-Type': 'application/json',
              
          },
          body:JSON.stringify({
              username,password
          }),
      })
      const data=await response.json()
      if(data.user){
       
        toast.success('Login successful')
        window.location.href='/resourcemanager'
      }else{
        toast.error("please check your username and password")
      }
      console.log(data)
  }
  return (
    <React.Fragment>
      <ToastContainer />
    {/* <div className='loginPage'> */}
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
       <img className='rmimg' src="/images/rml.png"></img>

        <div className='p-5  w-15  loginForm'>
            {/* <img className='imglogo' src="/images/pf1.png"></img> */}
            {/* <h2>Login Page</h2> */}
            <br></br>
            <form onSubmit={admin}>
                <div className='mb-3 form'>
                    <h1>Resource Manager</h1>
                    <label htmlFor="email"><strong>Email:</strong></label>
                    <input type="email" name='email' autoComplete='off' placeholder='Enter Email'
                     value={username}
                     onChange={(e)=>setUsername(e.target.value)}className='form-control rounded-0'/>
                </div>
                <div className='mb-3'> 
                    <label htmlFor="password"><strong>Password:</strong></label>
                    <input type="password" name='password' placeholder='Enter Password'
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)}className='form-control rounded-0'/>
                </div>
                <br></br>
                <div className='logsubmit'>
              {/* <Link to="/dashboard"> <button  type="submit" className='btn btn-success  logsub w-100 rounded-0 mb-2'>Log in  </button> </Link> <br></br> */}
               <button  type="submit" className='editt'>Log in  </button>  <br></br>
             
              </div>
                <div className='ico'>  <br></br>
               
                </div>
            </form>
        </div>
       
    </div>
    </React.Fragment>
  )
}

export default AdminLogin;