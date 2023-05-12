import { useState } from "react";
import noteContext from "./noteContext";
const NoteState = (props) => {
  const host="http://localhost:5000"
  const notesinitial = [];
  const [notes, setNotes] = useState(notesinitial);

//get Notes
const getNotes = async() => {
  const response = await fetch(`${host}/api/notes/fetchallnotes`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token')
    }
  }   
  );
  const json= await response.json();
  setNotes(json);
};

  //Add Notes
  const addNote = async(title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    }
    );
    const note= await response.json();
    setNotes(notes.concat(note));
    
    if(note.error){
      return {message:note.error,type:"danger"};
    }else{
      return {message:"Note Added Successful",type:"success"}
    }
  };
 
  //Delete Notes
  const deleteNote =async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    }
    );
    const json= await response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    if(json.error){
      return {message:json.error,type:"danger"};
    }else{
      return {message:"Note Deleted Successfully",type:"success"}
    }
  };

  //Edit Notes
  const editNote = async (id, title, description, tag) => {
    
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
    }
    );
    const json= await response.json();
    let newNotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
    if(json.error){
      return {message:json.error,type:"danger"};
    }else{
      return {message:"Notes Updated SuccessFully",type:"success"}
    }
  }

  return (
    <>
      <noteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
        {props.children}
      </noteContext.Provider>
    </>
  );
};
export default NoteState;
