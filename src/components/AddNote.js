import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context
    const [note,setNote] = useState({title:"",description:"",tag:""})

    const handleClick=(e)=>{
        e.preventDefault()
       addNote(note.title,note.description,note.tag);
       
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

  return (
 
      <div className='container shadow p-3 mb-5 bg-body-tertiary rounded'>
      <h1>Add Notes</h1>
      <div className="mb-3">
  <label htmlFor="title" className="form-label">Title</label>
  <input type="text" className="form-control" id="title" name="title" onChange={onChange}/>
</div>
<div className="mb-3">
  <label htmlFor="description" className="form-label">Description</label>
  <textarea className="form-control" id="description" name="description" rows="3" onChange={onChange} minLength={5} required></textarea>
</div>
<div className="mb-3">
  <label htmlFor="tag" className="form-label">Tag</label>
  <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
</div>

<button type="button" className="btn btn-primary btn-sm" onClick={handleClick}>Add note</button>
      
    </div>
    
  )
}

export default AddNote
