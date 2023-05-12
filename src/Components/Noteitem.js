import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";


function Noteitem(props) {
  const { note,updateNote } = props;
  const notecontext = useContext(noteContext);
  const { deleteNote } = notecontext;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          {note.tag}
          <h4 className="card-title">{note.title}</h4>
          <p className="card-text">{note.description}</p>
          <div>
            <button className="btn btn-primary" onClick={()=>{updateNote(note)}}>Edit</button>
            <button className="btn btn-danger mx-3" onClick={async()=>{
              const res=await deleteNote(note._id);
              props.showAlert(res.message,res.type)}}>Delete</button>
        </div>
        </div>     
      </div>
    </div>
  );
}

export default Noteitem;
