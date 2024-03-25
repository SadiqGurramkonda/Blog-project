 
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Blog } from './pages/Blog'
import { Signin } from './pages/Signin'
import { Blogs } from './pages/Blogs'
function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path="/signin" element={<Signin></Signin>}></Route>
      <Route path="/blogs/:id" element={<Blog></Blog>}></Route>
      <Route path="/blogs" element={<Blogs></Blogs>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
