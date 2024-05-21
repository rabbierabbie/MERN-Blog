import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Dashboard from './Pages/Dashboard'
import Projects from './Pages/Projects'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Header from './Components/Header'

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      {/*this is placed outside the router tag as we want this everywhere in the browser.In our project our header changes upon screen size change. Comments are added this way in JSX*/}
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
