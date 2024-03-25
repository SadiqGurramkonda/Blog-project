
import {  ChangeEvent } from "react"
import { Link } from "react-router-dom"

interface inputType {
    label: string,
    placeholder: string,
    type?:string
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void
}
export function LabelledInput({label,placeholder,type,onChange}:inputType){
    return(
        <div>
            <div className="my-4">
                <label className="block mb-1 text-sm font-medium text-gray-900">{label}</label>
                <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
            </div>
        </div>
    )
}

export function Button({label, onClick}:{label:string,onClick:()=>void}){

    return(
        <div>
            <button type="button" onClick={onClick} className="text-white bg-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-100  hover:text-gray-900 focus:ring-4 focus:ring-gray-100 font-medium rounded-md block text-sm w-full p-2.5">{label}</button>
        </div>
    )
}

export const AuthHeader = ({type}:{type: "signup" | "signin"})=>{
    
    return(
        <div className="bg-white rounded-lg">
            <div className="px-10">
                <div className="font-bold text-3xl text-center">
                    Create an account
                </div>
                <div className="text-gray-500 pl-2 text-center">
                    {type === "signin" ? "Don't have an account? " : "Already have an account? "}
                    <Link to={type === "signup" ? "/signin" : "/signup"} className="underline">
                        {type === "signin" ? "Sign Up" : "Sign In"}
                    </Link>
                </div>
            </div>
        </div>
    )
}