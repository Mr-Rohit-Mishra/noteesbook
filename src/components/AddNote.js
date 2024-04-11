import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext'


const  AddNote = (props)=> {
    const context = useContext(noteContext);
    const {addNote} = context;

    const[note,setNote]= useState({title: "", description: "", tag:""});

    const handleClick=(e)=>{
      e.preventDefault();
      addNote(note.title, note.description, note.tag);
      setNote({title: "", description: "", tag:""});
      props.showAlert("Note added successfully","success");
    }

    const onChange=(e) => {
      setNote({...note,[e.target.name]:e.target.value})
    }
    
  return (
    <div className="addnote-container">   
      <h2 class="text-center w-25">Add new notes</h2> 
      <div class="addnewnote w-75 d-flex flex-column justify-content-center">
        <div className="mb-3 my-5 mx-5">
          <label htmlFor="title" className="form-label">
            Enter Note Title
          </label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} placeholder="Title" onChange={onChange} required minLength={1}/>
        </div>
        <div className="mb-3 my-5 mx-5">
          <label htmlFor="tag" className="form-label">Enter Note Tag </label>
          <input type="text" className="form-control" id="tag" name="tag" placeholder="Tag" value={note.tag} onChange={onChange} required minLength={1}/>
        </div>
        <div className="mb-3 my-5 mx-5">
          <label htmlFor="description" className="form-label">Enter Note Description</label>
          <input type="text" className="form-control" id="description" placeholder="Description" name="description" rows={3} value={note.description} onChange={onChange} required minLength={1}/>
        </div>
        <button disabled={note.title.length<1 || note.description.length<1} type="submit" className="btn btn-primary w-25 mx-auto mt-5" onClick={handleClick}>Add</button>
      </div>  
    </div>
  )
}

export default AddNote