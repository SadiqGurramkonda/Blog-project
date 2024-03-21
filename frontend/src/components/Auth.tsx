import { SignupInput } from "@sadiqgurramkonda/medium-common"
import {  ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"


export const Auth = ()=>{
    const [postInputs, setPostInputs] = useState<SignupInput>({
        email: "",
        password: "",
        name: ""
    })
    return(
        <div className="h-screen flex flex-col justify-center">
            {JSON.stringify({postInputs})}
            <div className="flex justify-center">
                <div>
                    <div className="font-bold text-3xl text-center">
                        Create an account
                    </div>
                    <div className="text-gray-500 pl-2 text-center">
                        Already have an account? <Link to={"/signin"} className="underline">Login</Link>
                    </div>
                    <div className="mt-5 min-w-full">
                        <LabelledInput onChange={(e)=>{
                            setPostInputs(c=>{
                                return{...c,
                                name:e.target.value}
                                })}} placeholder="Enter your username" label="Username" />
                        <LabelledInput onChange={(e)=>{
                            setPostInputs(c=>{
                                return{
                                    ...c,
                                    email: e.target.value
                                }
                            })
                        }} placeholder="m@example.com"  label="Email"/>
                        <LabelledInput onChange={(e)=>{
                            setPostInputs(c=>{
                                return{
                                    ...c,
                                    password: e.target.value
                                }
                            })
                        }} placeholder=""  label="Password"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
interface inputType {
    label: string,
    placeholder: string,
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void
}
function LabelledInput({label,placeholder,onChange}:inputType){
    return(
        <div>
            <div className="m-2 w-full  ">
                <label className="block mb-1 text-sm font-medium text-gray-900">{label}</label>
                <input onChange={onChange} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
            </div>
        </div>
    )
}