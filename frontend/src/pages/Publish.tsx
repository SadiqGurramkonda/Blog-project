import axios from "axios";
import { ChangeEvent, useState } from "react"
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";


export const Publish = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate()

    const submitPost = async()=>{

        const resId = await axios.post(`${BASE_URL}/blog`,{
            title,
            content
        },{
            headers:{
                Authorization: "Bearer "+localStorage.getItem("token")
            }
        });
        console.log(resId);
        if(resId){
            navigate(`/blog/${resId.data.id}`);
        }
    }

    return (
    <div className="flex flex-col justify-center" >
        <div className="flex justify-center">
            <div className="max-w-3xl w-full mt-5">
                <div className="p-1 mb-1">
                    <input type="text" onChange={(e)=>{setTitle(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5 outline-none" placeholder="Title" required />
                </div>
                <div className="rounded-lg bg-gray-5 ">
                    <TextEditor onChange={(e)=>{setContent(e.target.value)}}></TextEditor>
                    <button type="submit" disabled={content.length < 10} onClick={submitPost} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-600 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-gray-900">
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}


export const TextEditor = ({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}) => {

    return (
        <div>
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-5 ">
                <div className="px-4 py-2 bg-white rounded-t-md">
                    <textarea onChange={onChange} rows={8} className="w-full px-0 text-sm text-gray-90 bg-white border-0 outline-none" placeholder="Write down your thoughts..." required />
                </div>
                
            </div>
        </div>

    )
}