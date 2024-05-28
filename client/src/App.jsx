import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Dashboard from './Pages/Dashboard'
import Projects from './Pages/Projects'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Header from './Components/Header'
import Footer from './Components/Footer'
import PrivateRoute from './Components/PrivateRoute.jsx'
import OnlyAdminPrivateRoute from './Components/OnlyAdminPrivateRoute.jsx'
import CreatePost from './Pages/CreatePost.jsx'
import UpdatePost from './Pages/UpdatePost.jsx'
import PostPage from './Pages/PostPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      {/*this is placed outside the router tag as we want this everywhere in the browser.In our project our header changes upon screen size change. Comments are added this way in JSX*/}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/projects' element={<Projects />}/>
        <Route element={<PrivateRoute />}>
        <Route path='/dashboard' element={<Dashboard />}/>
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
        <Route path='/create-post' element={<CreatePost />}/>
        <Route path='/update-post/:postId' element={<UpdatePost />}/>
        </Route>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/post/:postSlug' element={<PostPage />}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}
