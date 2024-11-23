import React from "react"
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import './index.css'
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {

  return (  
    <div >
      <Routes>
        <Route path="/" element = {<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/Home" element={<Home/>}/>
      </Routes>

    </div>
  );
}

export default App;
