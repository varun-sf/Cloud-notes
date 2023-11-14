import React, {useState}from 'react'
import { Link, useLocation, useNavigate} from 'react-router-dom'

const Navbar = (props) => {
  const navigate = useNavigate();
  let location = useLocation();
  // console.log(location);
  const logout=()=>{
    localStorage.removeItem("token");
    navigate("/login");
  }




  return (
  

        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme={props.mode}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Cloud-Notes</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
        
      </ul>



        
       {!localStorage.getItem("token")?
      <form className="d-flex">     
      <Link className="btn btn-primary mx-2" to="/login" role="button" >Login</Link>
      <Link className="btn btn-primary" to ="/signup" role="button">Signup</Link>
      </form>:      <ul className="navbar-nav me-5 mb-2 mb-lg-0">
      <li className="nav-item dropdown">
     
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          User-Menu
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
            
            <li><Link className="dropdown-item" to="/login" onClick={logout}>Logout</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li>
              {/* <div className="dropdown-item form-check form-switch"> */}
  <input className="dropdown-item form-check-input " type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={props.toggleColor} style={{"color":"red"}}/>
{/* </div> */}
</li>
          </ul>
        </li>
      </ul>}
      {/* // <div ><i className="fa-solid fa-user fa-xl mx-2" style={{color: userColor}}  onMouseOver={changeUserColor} onMouseLeave={changeUserColor} ></i> 
      // <button className="btn btn-primary" onClick={logout}>Logout</button></div>}  */}
    </div>
  </div>
</nav>
      
    
  )
}

export default Navbar
