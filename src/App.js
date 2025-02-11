import './App.css';
import{BrowserRouter,Routes,Route,}from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { useState } from 'react';

function App() {

  const [alert, setAlert]= useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }

  return (
    <>
     
      <BrowserRouter>
        <Header />
        <Alert alert={alert}/>
        <NoteState>
          <Routes>

            <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
            <Route exact path="/About" element={<About/>}/>
            <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>

          </Routes>
        </NoteState>
      </BrowserRouter>
      
    </>
  );
}

export default App;





