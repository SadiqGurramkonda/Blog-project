
import { useParams } from "react-router-dom";
import { BlogDetail } from "../components/BlogDetail"
import { useBlog } from "../hooks/fetchBlogs";



export const Blog = ()=>{

  const {id} = useParams();

  const {loading,blog} = useBlog({id: id || "1"});

    if(loading){
        return(
            <div>
                loading...
            </div>
        )
    }
    return(
        <div>
          <BlogDetail blog={blog}></BlogDetail>
        </div>
    )
}