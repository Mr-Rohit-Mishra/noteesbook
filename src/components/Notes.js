import React,{useContext, useEffect, useRef, useState} from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom'


export default function Notes(props) {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const{notes,getNotes,editNote}=context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }
    else{
      navigate("/login");
    }
    //eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)

  const[note,setNote]= useState({id: "", etitle: "", edescription: "", etag:""});

  const updateNote= (currentNote) =>{
    ref.current.click();
    setNote({id: currentNote._id, etitle:currentNote.title, etag:currentNote.tag, edescription:currentNote.description})
    
  }

  const handleClick=(e)=>{
    
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Note updated successfully","success");
  }

  const onChange=(e) => {
    setNote({...note,[e.target.name]:e.target.value})
  }
    
    
  return (
    <>
    

    <div className="modalpopup">
    
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body"> 
              <div className="mb-3 my-5 mx-5">
                <label htmlFor="title" className="form-label">
                  Enter Note Title
                </label>
                <input type="text" onChange={onChange} minLength={1} required className="form-control" id="etitle" name="etitle" value={note.etitle} />
              </div>
              <div className="mb-3 my-5 mx-5">
                <label htmlFor="tag" className="form-label">Enter Note Tag </label>
                <input type="text" onChange={onChange} minLength={1} required className="form-control" id="etag" name="etag"  value={note.etag} />
              </div>
              <div className="mb-3 my-5 mx-5">
                <label htmlFor="description" className="form-label">Enter Note Description</label>
                <input type="text" onChange={onChange} minLength={1} required className="form-control" id="edescription" name="edescription" rows={3} value={note.edescription} />
              </div>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<1 || note.edescription.length<1} type="button" className="btn btn-primary" onClick={handleClick}>Update Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div className="row allnotes">
      <h2 className="text-center">Your Notes</h2>
      <div className="container text-center mb-5 fs-4">
        {notes.length===0 && 'No Notes to Display'}
      </div>
      <div class="notes">
        {notes.map((note)=>{
          return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>
        })}
      </div>
    </div>
    <AddNote  showAlert={props.showAlert}/>
    </>
  )
}
