import {useState} from 'react'
import noteContext from './noteContext'


const NoteState = (props) => {
  const url ="http://localhost:5000"
    const notesInitial = []
      const [notes,setNotes] = useState(notesInitial);
  
      const getallNotes =async ()=>{
    
       const response = await fetch(`${url}/api/notes/fetchallnotes`, {
         method: "GET", 
         headers: {
           "Content-Type": "application/json",
           "auth-token":localStorage.getItem('token')
         },
       });
       const json = await response.json(); 
       
      setNotes(json);
      
     
   
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
       getallNotes();
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
      const json = await response.json(); 
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
      const json = await response.json(); 


      for (let index = 0; index < notes.length; index++) {
        if(notes[index]._id===id){
          notes[index].title = title;
          notes[index].description = description;
          notes[index].tag = tag;
        }
        break;
        
      }
     getallNotes();
       
     }


  return (
      <noteContext.Provider value={{notes,addNote,deleteNote,getallNotes,editNote}}>
        {props.children}
      </noteContext.Provider>
  )
}

export default NoteState;
