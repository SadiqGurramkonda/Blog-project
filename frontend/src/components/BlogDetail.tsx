import { Blog } from "../hooks/fetchBlogs"
import { Avatar } from "./BlogCard";



export const BlogDetail = ({ blog }: { blog: Blog }) => {

    return (
        <div>
            <div className="grid grid-cols-12 px-10">
                <div className="col-span-8 flex justify-center">
                    <div className="max-w-xl">
                        <div className="font-extrabold text-2xl mb-2">
                            {blog.title}
                        </div>
                        <div className="font-light text-sm">
                            {blog.content}
                        </div>
                    </div>
                </div>
                <div className="col-span-4">
                    Author
                    <div className="flex">
                        <div className="flex flex-col justify-center">
                            <Avatar size="small" name={blog.author.name}></Avatar>
                        </div>
                        <div className="font-bold text-lg">
                            {blog.author.name}
                        </div>
                    </div>
                    {/* <div>
                        <Blogs></Blogs>
                    </div> */}
                </div>
            </div>
        </div>
    )
}