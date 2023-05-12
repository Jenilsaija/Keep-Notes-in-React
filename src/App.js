import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Components/About";
import Home from "./Components/Home";
import NoteState from "./context/notes/NoteState";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { useState } from "react";
import Alert from "./Components/Alert";
import NavBar from "./Components/NavBar";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route
                exect
                path="/"
                element={
                  <>
                    <Home showAlert={showAlert} />
                  </>
                }
              ></Route>
              <Route
                exect
                path="/about"
                element={
                  <>
                    <About />
                  </>
                }
              ></Route>
              <Route
                exect
                path="/login"
                element={
                  <>
                    <Login showAlert={showAlert} />
                  </>
                }
              ></Route>
              <Route
                exect
                path="/signup"
                element={
                  <>
                    <Signup showAlert={showAlert} />
                  </>
                }
              ></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
