import axios from "axios";
import { useEffect, useState } from "react"
import { BASE_URL } from "../config";

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
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/blog/bulk`,{
            headers:{
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }).then(response => { setBlogs(response.data.blogs);
            setLoading(false);
        });
        
    },[])

    return{
        loading,
        blogs
    }
}

export const useBlog =  ({id}:{id:string})=>{
    const [loading,setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BASE_URL}/blog/${id}`,{
            headers:{
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }).then(response => { setBlog(response.data.blog);
            setLoading(false);
        });
        
    },[id])

    return(
        {
            loading,
            blog
        }
    )
}