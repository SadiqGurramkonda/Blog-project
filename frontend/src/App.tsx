 
import { BrowserRouter, Navigate, Route, Routes, redirect } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Blog } from './pages/Blog'
import { Signin } from './pages/Signin'
import { Blogs } from './pages/Blogs'
import { Layout } from './components/layout'
import { Publish } from './pages/Publish'
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout></Layout>}>
          <Route path='/' element={<Navigate to={"/signup"}></Navigate>}></Route>
          <Route path="/blog/:id" element={<Blog></Blog>}></Route>
          <Route path="/blogs" element={<Blogs></Blogs>}></Route>
          <Route path="/publish" element={<Publish></Publish>}></Route>
        </Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/signin" element={<Signin></Signin>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
