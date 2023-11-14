
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { useState } from 'react';
import Userprofile from './components/Userprofile';


function App() {
  let [mode,setMode] = useState("light"); 


  let toggleColor =()=>{
     if(mode==="light"){
      document.body.style.backgroundColor= "#251f1f";
      document.body.style.color="white";
      setMode("dark");
      
     }
     else{
      setMode("light");
      document.body.style.backgroundColor="white";
      document.body.style.color="black";
     }
  }

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
    <NoteState>
    <Router>
      <Navbar mode={mode} toggleColor={toggleColor} />
      <Alert alert={alert}/>
      <div className='container'>
      <Routes>       
        <Route path="/" element={<Home showAlert={showAlert} mode={mode}/>}>
          </Route>
        <Route path="/about" element={<About mode={mode}/>}>
          </Route>
          <Route path="/login" element={<Login showAlert={showAlert}/>}>
          </Route>
          <Route path="/signup" element={<Signup showAlert={showAlert}/>}>
          </Route>  
          <Route path="/profile" element={<Userprofile/>}>
          </Route>         
  </Routes>
  </div>
    </Router>
    
    </NoteState>
    </>
  );
}

export default App;
