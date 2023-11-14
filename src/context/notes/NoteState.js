import {useState} from 'react'
import noteContext from './noteContext'


const NoteState = (props) => {
  const url = process.env.REACT_APP_BASEURL
    const notesInitial = []
      const [notes,setNotes] = useState(notesInitial);
      const [profile,setProfile] = useState({"name":"","email":""});
      const [noPosts,setnoPosts] = useState(0);
  
      const getallNotes =async ()=>{
    
        try{
       const response = await fetch(`${url}/api/notes/fetchallnotes`, {
         method: "GET", 
         headers: {
           "Content-Type": "application/json",
           "auth-token":localStorage.getItem('token')
         },
       });
       const json = await response.json(); 
      setnoPosts(json.length);
      setNotes(json);
        }
        catch(err){
          console.log(`Get all notes-${err}`);
        }
      
     
   
  }





     const addNote =async (title,description,tag)=>{
      try{
      const response = await fetch(`${url}/api/notes/addnotes`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
       
        body: JSON.stringify({title,description,tag}), 
      });
      const json = await response.json(); 
        setNotes(notes.concat(json));
    }
    catch(err){
      console.log(err);
    }}




     const deleteNote =async (id)=>{  try{
      const response = await fetch(`${url}/api/notes/deletenote/${id}`, {
        method: "Delete", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },

      });
     
       getallNotes();
    }
    catch(err){
      console.log(err);
    }}
     

     const editNote =async (id,title,description,tag)=>{
     
      const response = await fetch(`${url}/api/notes/updatenote/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
       
        body: JSON.stringify({title,description,tag}), 
      });
     getallNotes();
       
     }


     const getUser = async()=>{
      const response = await fetch(`${url}/api/auth/getuser`, {
        method: "Get", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
      });

       let json = await response.json();
       getallNotes()
       setProfile({"name":json.name,"email":json.email});
     }


  return (
      <noteContext.Provider value={{notes,noPosts,addNote,deleteNote,getallNotes,editNote,getUser,profile}}>
        {props.children}
      </noteContext.Provider>
  )
}

export default NoteState;
