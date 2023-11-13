import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
   let navigate = useNavigate();

const handleSubmit= async(e)=>{
    e.preventDefault();
    console.log(JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}))
    try{
      
    const response = await fetch("http://localhost:5000/api/auth/create-user", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
                  
        },
        body: JSON.stringify({name:credentials.name,email : credentials.email,password : credentials.password}), 
     
      });
      const json = await response.json();
      console.log(json)
      if(json.success){
             localStorage.setItem("token",json.authtoken);
             props.showAlert("Account created successfully","success")
             navigate("/");
      }
      else{
          props.showAlert("Invalid credentials","danger") 
      }
    }
    catch(err){
      console.log(err);
    }

}

const onChange=(e)=>{
  setCredentials({...credentials,[e.target.name]:e.target.value})
}




  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
          </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1"  name="email"  onChange={onChange}  aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control"  name="password"  onChange={onChange}  id="exampleInputPassword1" minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cexampleInputPassword1" className="form-label">Confirm Password</label>
          <input type="password" className="form-control"  name="cpassword" onChange={onChange}  id="cexampleInputPassword1"/>
        </div>

     
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
