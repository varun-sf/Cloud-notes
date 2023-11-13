import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context
  return (
    <>
    <div className="col-md-3">
    <div className="card" >
    
    <div className="card-body">
      <div className="d-flex">
      <h5 className="card-title mx-2">{props.note.title}</h5>
      <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(props.note._id)}}></i>
      <i  className="fa-solid fa-pen-to-square"  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{props.updateNote(props.note)}}></i>
      
      </div>
      <p className="card-text">{props.note.description}</p>
      
    </div>
  </div>
  </div>
  </>
  )
}

export default NoteItem
