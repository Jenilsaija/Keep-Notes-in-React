import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

function Addnote(props) {
  const notecontext = useContext(noteContext);
  const { addNote } = notecontext;
  const [note, setNote] = useState({ title: "", description: "", tag: ""});
  const handleadd = async(e) => {
    e.preventDefault();
    const res=await addNote(note.title,note.description,note.tag);
    setNote({ title: "", description: "", tag: ""});
    props.showAlert(res.message,res.type)
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div
        className="m-2 bg-white"
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        <div className="m-2 fs-2 fw-bold">Add New Product</div>
      </div>
      <div
        className="m-2 bg-white"
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        {" "}
        <div className="p-2">
          <form className="p-3" encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={note.title}
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input 
                type="text"
                name="description"
                value={note.description}
                onChange={onChange}
                className="form-control"
                id="description"
                minLength={5}
                required
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                id="tag"
                name="tag"
                value={note.tag}
                onChange={onChange}
              />
            </div>
            <button
              type="submit"
              onClick={handleadd}
              disabled={note.description.length<5}
              className="btn btn-primary"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addnote;
