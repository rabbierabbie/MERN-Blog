import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Dashboard from './Pages/Dashboard'
import Projects from './Pages/Projects'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/projects' element={<Projects />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    </BrowserRouter>
  )
}
