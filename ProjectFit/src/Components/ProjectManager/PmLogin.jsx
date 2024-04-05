import React ,{useState}from 'react';
import './Pmlogin.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import jwt from 'jsonwebtoken';
import {Link} from 'react-router-dom'

const PmLogin = () => {

  const[username,setUsername]=useState(' ');
  const[password,setPassword]=useState(' ');
  async function admin(event){
      event.preventDefault()
      const response =await fetch('http://localhost:5000/api/projectmanagerlogin',{
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
        window.location.href='/dashboard'
      }else{
        toast.error("please check your username and password")
      }
      console.log(data)
  }
  return (
    <React.Fragment>
      <ToastContainer />
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
         <img className='rmimg' src="/src/img/pml.png"></img>

        <div className='p-5  w-15  loginForm'>
            
            {/* <h2>Login Page</h2> */}
            <br></br><br></br><br></br><br></br><br></br>
            <form onSubmit={admin}>
                <div className='mb-3'>
                <h1>Project Manager</h1>
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
                {/* <div className='mb-1'>  <br></br>
                    <input type="checkbox" name="tick" id="tick" className='me-2'/> 
                    <label htmlFor="password">You are Agree with terms & conditions</label>
                </div> */}
            </form>
        </div>
    </div>
    </React.Fragment>
  )
}

export default PmLogin;