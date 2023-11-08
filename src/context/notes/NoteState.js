import {useState} from 'react'
import {noteContext} from './noteContext'


const NoteState = () => {
    const notesInitial = [
        {
          "_id": "654b2c24975bc92497ff4264",
          "user": "6547f5f859c2c5e50dc0e745",
          "title": "Jumanji",
          "description": "BoardGameddddddddddd",
          "tag": "general",
          "date": "2023-11-08T06:35:16.089Z",
          "__v": 0
        },
        {
          "_id": "654b2c3c975bc92497ff4266",
          "user": "6547f5f859c2c5e50dc0e745",
          "title": "Jumanji2",
          "description": "Hakuna matata timon and pumba",
          "tag": "general",
          "date": "2023-11-08T06:35:40.752Z",
          "__v": 0
        }
      ];
      const [notes,setNotes] = useState(notesInitial);
  return (
      <noteContext.Provider value={{notes,setNotes}}>
        {props.children}
      </noteContext.Provider>
  )
}

export default NoteState;
