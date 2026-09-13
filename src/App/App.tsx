import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home'
import Blog from '../Blog'
import Projects from '../Projects'
import '../Assets/css/fonts.css'
import './App.css'


import { dirichletRoute } from "../Articles/Routes"
import { fejerRoute } from "../Articles/Routes"

function App() {
  return (
      <BrowserRouter>
<link href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:ital,wght@0,400;0,700;1,400;1,700&family=Architects+Daughter&family=Cabin+Sketch:wght@400;700&family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Creepster&family=Cutive+Mono&family=Ewert&family=Fascinate&family=Fredericka+the+Great&family=Fuzzy+Bubbles:wght@400;700&family=Handlee&family=IM+Fell+English:ital@0;1&family=Kranky&family=Limelight&family=Miltonian&family=Neucha&family=Nixie+One&family=Ole&family=Rye&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Special+Elite&family=Walter+Turncoat&display=swap" rel="stylesheet"></link>
<div id="background" />
        <Navbar/>
        <div id="panel">
           <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Blog" element={<Blog />}></Route>
            <Route path="/Projects" element={<Projects />}></Route>
            <Route {...dirichletRoute}></Route>
            <Route {...fejerRoute}></Route>

          </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App
