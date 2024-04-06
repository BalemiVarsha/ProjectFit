import React ,{useState}from 'react';
import './Login.css';
import {Link} from 'react-router-dom'

const Choose= () => {
  return (
    
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border solid loginForm'>
            <img className='imglogo' src="/images/pf1.png"></img>
            {/* <h2>Login Page</h2> */}
            <br></br>
            <form >
              {/* <h2>Log in as :</h2> */}
                <div className='logsubmit'>
              <Link to="/adminlogin"> <button className='btn btn-success  logsub w-100 rounded-0 mb-2'>Resource Manager</button> </Link> <br></br>
              <Link to="/projectmanagerlogin"> <button className='btn btn-success  logsub w-100 rounded-0 mb-2 log'>Project Manager</button> </Link> <br></br>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Choose;