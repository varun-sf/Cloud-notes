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
 
      <div className='container my-3'>
      <h1>Add Notes</h1>
      <div className="mb-3">
  <label htmlFor="title" className="form-label">Email address</label>
  <input type="text" className="form-control" id="title" name="title" placeholder="name@example.com" onChange={onChange}/>
</div>
<div className="mb-3">
  <label htmlFor="description" className="form-label">Example textarea</label>
  <textarea className="form-control" id="description" name="description" rows="3" onChange={onChange} minLength={5} required></textarea>
</div>
<div className="mb-3">
  <label htmlFor="tag" className="form-label">tag</label>
  <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
</div>

<button type="button" className="btn btn-primary btn-sm" onClick={handleClick}>Add note</button>
      
    </div>
    
  )
}

export default AddNote
