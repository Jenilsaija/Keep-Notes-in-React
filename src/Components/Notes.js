import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
function Notes(props) {
  const notecontext = useContext(noteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: ""});
  const { notes, getNotes, editNote } = notecontext;

  useEffect(() => {
    if(localStorage.getItem('token')!==null){
      getNotes();
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote(currentNote)
  };

  const handleupdate =async () => {
    let res=await editNote(note._id,note.title,note.description,note.tag);
    refclose.current.click();
    props.showAlert(res.message,res.type)
   };
  const ref = useRef(null);
  const refclose = useRef(null);

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };


  return (
    <>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary btn-lg d-none"
        data-bs-toggle="modal"
        data-bs-target="#modalId"
      >
        Launch
      </button>

      <div
        className="modal fade"
        id="modalId"
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitleId">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
                <form className="p-2" encType="multipart/form-data">
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
                      minLength={5}
                      id="description"
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
                </form>
              </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button type="button" onClick={handleupdate} disabled={note.description.length<5} className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="m-2 bg-white"
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        <div className="m-2 fs-2 fw-bold">Show Notes</div>
      </div>
      <div
        className="m-2 bg-white"
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        <div className="p-2">
          <div className="row my-3">
          <div className="container mx-3">
            {notes.length===0 && 'No Notes to Display'}
          </div>
            {notes.map((note) => {
              return (
                <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Notes;
