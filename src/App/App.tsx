import { HashRouter, Routes, Route } from "react-router-dom"
import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home'
import Blog from '../Blog'
import Projects from '../Projects'
import '../Assets/css/fonts.css'
import './App.css'

import { mahalanobisRoute, rsaRoute } from "../Articles/Routes"
import { dirichletRoute } from "../Articles/Routes"
import { fejerRoute } from "../Articles/Routes"
import { frenchRoute } from "../Articles/Routes"

function App() {
  return (
      <HashRouter>
<link href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:ital,wght@0,400;0,700;1,400;1,700&family=Architects+Daughter&family=Cabin+Sketch:wght@400;700&family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Creepster&family=Cutive+Mono&family=Ewert&family=Fascinate&family=Fredericka+the+Great&family=Fuzzy+Bubbles:wght@400;700&family=Handlee&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=IM+Fell+English:ital@0;1&family=Inconsolata:wght@200..900&family=Inria+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Karla:ital,wght@0,200..800;1,200..800&family=Kranky&family=Limelight&family=Miltonian&family=Neucha&family=Nixie+One&family=Noto+Sans+Math&family=Noto+Sans+Mono:wght@400;700&family=Ole&family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&family=Rye&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&family=Space+Grotesk:wght@300..700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Special+Elite&family=Walter+Turncoat&display=swap" rel="stylesheet" />
<div id="background" />
        <Navbar/>
        <div id="panel">
           <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Blog" element={<Blog />}></Route>
            <Route path="/Projects" element={<Projects />}></Route>
            <Route {...dirichletRoute}></Route>
            <Route {...rsaRoute}></Route>
            <Route {...fejerRoute}></Route>
            <Route {...frenchRoute}></Route>
            <Route {...mahalanobisRoute}></Route>
          </Routes>
        </div>
    </HashRouter>
  )
}

export default App
