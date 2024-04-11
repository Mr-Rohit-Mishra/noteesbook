import React, {useState} from 'react'
import {Link, useNavigate } from 'react-router-dom'

export default function Signup(props) {

  let navigate = useNavigate();

  const[credentials, setCredentials] = useState({name: "", email:"" , password: "", cpassword: ""})

  const handleSubmit = async (e) => {

    e.preventDefault();

    const {name, email, password}= credentials;

    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name,email,password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      // save the auth token and redirect 
      localStorage.setItem('token', json.authtoken);
      navigate("/login");
      props.showAlert("Account Created Successfully", "success")
    }
    else{
      props.showAlert("Invalid credentials", "danger")
    }
  }

  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]:e.target.value})
  }

  return (
    
  <div className="row signup-form " >
    <div className="col-md-12">
      <div className="glassmorphism">
        <h2 className="text-center mb-4">Register to Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" className="form-control" id="name" name="name" onChange={onChange} required/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" className="form-control" id="email" name="email" onChange={onChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" className="form-control" id="password" name="password" onChange={onChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="cpassword">Confirm Password:</label>
            <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} required />
          </div>
          <button type="submit" className="btn btn-primary btn-block col-lg-4 mb-2">
            Register
          </button>
          <Link className=" mx-2 col-lg-8" to="/login" role="button">Already have an Account ? Login</Link>
        </form>
      </div>
    </div>
  </div>


  )
}


