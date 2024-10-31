import axios from "axios";
import { useEffect, useState } from "react"
import { BASE_URL } from "../config";
import { useRecoilState, useRecoilValue } from "recoil";
import { blogsState } from "../store/blogs";

export interface Blog{
    "content": string,
            "title": string,
            "id": number,
            "author": {
                "name": string
            }
}

export const useBlogs = ()=>{
    const [loading,setLoading] = useState(true);
    const [blogs, setBlogs] = useRecoilState(blogsState);

        useEffect(() => {
            if(blogs.length == 0){
            axios.get(`${BASE_URL}/blog/bulk`,{
                headers:{
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }).then(response => { setBlogs(response.data.blogs);
                setLoading(false);
            });
        }else {
            setLoading(false);
        }  
        },[blogs]);

    return{
        loading,
        blogs
    }
}

export const useBlog =  ({id}:{id:string})=>{
    const blogs  = useRecoilValue(blogsState)
    const [loading,setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    // useEffect(() => {
    //     axios.get(`${BASE_URL}/blog/${id}`,{
    //         headers:{
    //             Authorization: "Bearer " + localStorage.getItem('token')
    //         }
    //     }).then(response => { setBlog(response.data.blog);
    //         setLoading(false);
    //     });
        
    // },[id]);

    useEffect(() => {
        const fetchBlog = async () => {
            const blogwithId = blogs.find((blog: any) => blog.id == id);
            if (blogwithId) {
                setBlog(blogwithId);
                setLoading(false);
            } else {
                try {
                    const response = await axios.get(`${BASE_URL}/blog/${id}`, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem('token')
                        }
                    });
                    setBlog(response.data.blog);
                    setLoading(false);
                } catch (error) {
                    // Handle error
                    console.error("Error fetching blog:", error);
                    setLoading(false);
                }
            }
        };

        fetchBlog();
    }, [id, blogs]);

    return {
        loading,
        blog
    };
}

export const useMyBlogs = ()=>{
    const [isLoading, setIsLoading] = useState(false);
    const [myBlogs, setMyBlogs] = useState<Blog[]>([]);

        useEffect(() => {
          if (myBlogs.length == 0) {
            setIsLoading(true)
            axios
              .get(`${BASE_URL}/blog/myBlogs`, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              })
              .then((response) => {
                setMyBlogs(response.data.myBlogs);
                setIsLoading(false);
              });
          } else {
            setIsLoading(false);
          }
        }, []);

    return {isLoading, myBlogs};
}