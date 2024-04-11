import noteContext from "./noteContext";
import { useState } from "react";

const NoteState=(props)=>{
  const host = "http://localhost:5000"
  const notesInitial= []

  const[notes, setNotes]= useState(notesInitial)


  // Get All note
  const getNotes= async()=>{
    // Api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      }
      });
    const json = await response.json();
    setNotes(json)
  }


  // Add A note
  const addNote= async(title,description,tag)=>{
    // Api call
    const response = await fetch(`${host}/api/notes/addnote`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body:JSON.stringify({title, description, tag})
      });
    const note = await response.json();
    setNotes(notes.concat(note))
  }

  // Delete A note
  const deleteNote= async(id)=>{
   // Api call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      }
    });
    const json = response.json();
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Update A note
  const editNote= async(id, title, description, tag)=>{

    // Api call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body:JSON.stringify({title, description, tag})
      });

    const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes))

    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;

        break;
      }
      
    }
    setNotes(newNotes);
  }



  return(
      <noteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getNotes}}>
          {props.children}
      </noteContext.Provider>
  )
}

export default NoteState;
