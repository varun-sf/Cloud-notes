import React, { useContext, useEffect,useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getallNotes,editNote } = context;
 let navigate = useNavigate();
  useEffect(() => { 
    if(localStorage.getItem("token")){
    console.log(localStorage.getItem("token"));
    getallNotes()
  }
  else{
    console.log("trying to go to login");
  navigate("/login");
  }
 }, [])
  
  const [note,setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
  const updateNote =(currentnote)=>{
   setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
  }
  const handleClick=()=>{
   editNote(note.id,note.etitle,note.edescription,note.etag)
   
  }
const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}

  return (

    <div className='row my-3'>
      <AddNote />
      {/* <!-- Button trigger modal --> */}
      {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button> */}
      {/* <!-- Modal --> */}

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/*  */}
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Email address</label>
                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle}  placeholder="name@example.com" onChange={onChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Example textarea</label>
                <textarea className="form-control" id="edescription" name="edescription" value={note.edescription} rows="3" onChange={onChange}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">tag</label>
                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
              </div>

             
              {/*  */}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss='modal' onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <h1>Your Notes</h1>
      <div className='container mx-2'>
      {notes.length===0 && 'No notes to display'}
      </div>
      {
        notes.map((note) => {
          return <NoteItem key={note._id} note={note} updateNote={updateNote} />
        })
      }
      


    </div>
  )
}

export default Notes
