 
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Blog } from './pages/Blog'
import { Signin } from './pages/Signin'
import { Blogs } from './pages/Blogs'
import { Layout } from './components/layout'
import { Publish } from './pages/Publish'
import { Loader } from './components/Loader'
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout></Layout>}>
          <Route path="/blog/:id" element={<Blog></Blog>}></Route>
          <Route path="/blogs" element={<Blogs></Blogs>}></Route>
          <Route path="/publish" element={<Publish></Publish>}></Route>
          <Route path="/loader" element={<Loader/>}></Route>
        </Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/signin" element={<Signin></Signin>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
