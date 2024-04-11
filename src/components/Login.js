import React , { useState} from 'react'
import {Link, useNavigate } from 'react-router-dom'


export default function Login(props) {

  let navigate = useNavigate();

  const[credentials, setCredentials] = useState({email:"" , password: ""})

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      // save the auth token and redirect 
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("Logged in Successfully", "success")
    }
    else{
      props.showAlert("Invalid credentials", "danger")
    }
  }

  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]:e.target.value})
  }

  return (
    <div className="container w-25 login-form">
      <h2 class="text-center mb-5">Login to Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} value={credentials.email}/>
          
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password}/>
        </div>
    
        <button type="submit" className="btn btn-primary col-lg-12 my-3">
          Login
        </button>
        
        <Link className="my-5 col-lg-12 text-center align-item-center" to="/signup" role="button">Don't have an account? Sign Up</Link>
      </form>
    </div>
  )
}
