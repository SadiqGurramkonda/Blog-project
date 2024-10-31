 
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Blog } from './pages/Blog'
import { Signin } from './pages/Signin'
import { Blogs } from './pages/Blogs'
import { Layout } from './components/layout'
import { Publish } from './pages/Publish'
import { RecoilRoot } from 'recoil'
import MyBlogs from './pages/MyBlogs'
function App() {


  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout></Layout>}>
            <Route
              path="/"
              element={<Navigate to={"/signup"}></Navigate>}
            ></Route>
            <Route path="/blogs" element={<Blogs></Blogs>}></Route>
            <Route path="/myBlogs" element={<MyBlogs></MyBlogs>}></Route>
            <Route path="/blog/:id" element={<Blog></Blog>}></Route>
            <Route path="/publish" element={<Publish></Publish>}></Route>
          </Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/signin" element={<Signin></Signin>}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App
