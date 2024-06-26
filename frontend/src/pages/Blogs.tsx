import { BlogCard } from "../components/BlogCard"
import { Loader } from "../components/Loader";
import { useBlogs } from "../hooks/fetchBlogs"



export const Blogs = ()=>{
    const {blogs,loading} = useBlogs();
    if (loading) {
        return (
            <div className="max-h-screen">
                <Loader />
                <Loader />
            </div>
        )
    }
    return(
            <div>
            <div className="flex justify-center">
            <div className="max-w-2xl">
                {blogs.map((blog: any)=>{return(<BlogCard id={blog.id} key={blog.id} authorName={blog.author.name} publishedDate="2nd Feb 2024" title={blog.title} content={blog.content}/>)})} 
            </div>
            </div>
        </div>

    )
}