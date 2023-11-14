import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'

const Userprofile = () => {
    const context = useContext(noteContext);
    const {noPosts,getUser,profile} = context;
    useEffect(() => { 
          getUser()
     }, [getUser])

  return (
    <div className='container'>
    <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
    <input className="form-control" type="text" value={profile.name} aria-label="Disabled input example" disabled readOnly></input>
    <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
    <input className="form-control" type="text" value={profile.email} aria-label="Disabled input example" disabled readOnly></input>
    <label htmlFor="exampleInputPassword1" className="form-label">No. of notes</label>
    <input className="form-control" type="text" value={noPosts} aria-label="Disabled input example" disabled readOnly></input>
  </div>
  )
}

export default Userprofile
