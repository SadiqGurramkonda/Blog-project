
import { BlogCard } from "../components/BlogCard";
import { Loader } from "../components/Loader";
import { useMyBlogs } from "../hooks/fetchBlogs";
        

export default function MyBlogs(){
    const { myBlogs, isLoading} = useMyBlogs();
    console.log(myBlogs);

    if (isLoading) {
      return (
        <div className="max-h-screen">
          <Loader />
          <Loader />
        </div>
      );
    };

    if(!myBlogs.length && !isLoading){
        return(
            <div className="text-center text-lg">No Blogs published yet, start by clicking on Create!</div>
        )
    }
    return (
      <div>
        <div className="flex justify-center">
          <div className="max-w-2xl">
            {myBlogs.map((blog: any) => {
              return (
                <BlogCard
                  id={blog.id}
                  key={blog.id}
                  authorName={blog.author.name}
                  publishedDate="2nd Feb 2024"
                  title={blog.title}
                  content={blog.content}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
}