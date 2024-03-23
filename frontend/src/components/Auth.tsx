import { SignupInput } from "@sadiqgurramkonda/medium-common"
import {  ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"


export const Auth = ({type}:{type: "signup" | "signin"})=>{
    const [postInputs, setPostInputs] = useState<SignupInput>({
        email: "",
        password: "",
        name: ""
    })
    return(
        <div className="h-screen flex flex-col bg-slate-300 justify-center">
            {/* {JSON.stringify({postInputs})} */}
            <div className="flex justify-center">
                <div className="bg-white rounded-lg py-12 px-6">
                    <div className="px-10">
                        <div className="font-bold text-3xl text-center">
                            Create an account
                        </div>
                        <div className="text-gray-500 pl-2 text-center">
                            {type==="signin" ? "Don't have an account? ": "Already have an account? "} 
                            <Link to={type === "signup"?"/signin":"/signup"} className="underline">
                                {type === "signin" ? "Sign Up": "Sign In"}
                            </Link>
                        </div>
                    </div>
                    <div className="mt-5">
                        <LabelledInput onChange={(e)=>{
                            setPostInputs(c=>{
                                return{...c,
                                name:e.target.value}
                                })}} placeholder="Enter your username" label="Username" type="text"/>
                        <LabelledInput onChange={(e)=>{
                            setPostInputs(c=>{
                                return{
                                    ...c,
                                    email: e.target.value
                                }
                            })
                        }} placeholder="m@example.com"  label="Email" type="email"/>
                        <LabelledInput onChange={(e)=>{
                            setPostInputs(c=>{
                                return{
                                    ...c,
                                    password: e.target.value
                                }
                            })
                        }} placeholder="123456"  label="Password" type="password"/>
                        <Button label={(type==="signup")?"Sign Up":"Sign In"} onClick={()=>{console.log("btn-clicked")}}></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
interface inputType {
    label: string,
    placeholder: string,
    type?:string
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void
}
function LabelledInput({label,placeholder,type,onChange}:inputType){
    return(
        <div>
            <div className="my-4">
                <label className="block mb-1 text-sm font-medium text-gray-900">{label}</label>
                <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
            </div>
        </div>
    )
}

function Button({label, onClick}:{label:string,onClick:()=>void}){

    return(
        <div>
            <button type="button" onClick={onClick} className="text-white bg-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-100  hover:text-gray-900 focus:ring-4 focus:ring-gray-100 font-medium rounded-md block text-sm w-full p-2.5">{label}</button>
        </div>
    )
}