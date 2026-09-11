import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home'
import Blog from '../Blog'
import Projects from '../Projects'
import '../Assets/css/fonts.css'
import './App.css'

import { dirichletRoute } from "../Articles/Routes"

function App() {
  return (
      <BrowserRouter>
        <div id="background" />
        <Navbar/>
        <div id="panel">
           <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Blog" element={<Blog />}></Route>
            <Route path="/Projects" element={<Projects />}></Route>
            <Route {...dirichletRoute}></Route>
          </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App
