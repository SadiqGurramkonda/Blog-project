
import { useState } from "react"
import { AuthHeader, Button, LabelledInput } from "../components/Auth"

import { Quote } from "../components/Quote"
import axios from "axios"
import { BASE_URL } from "../config"
import { SigninInput } from "@sadiqgurramkonda/medium-common"


export const Signin = () => {

    const [postInputs, setPostInputs] = useState<SigninInput>({
        email: "",
        password: "",
    })

    const signin = async()=>{
        const response = await axios.post(`${BASE_URL}/user/signin`,postInputs);
        localStorage.setItem('token',response.data.token);
        console.log(localStorage.getItem('token'));
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="h-screen flex flex-col bg-slate-300 justify-center">
                {JSON.stringify({postInputs})}
                <div className="flex justify-center">
                    <div className="bg-white rounded-lg px-6">
                        <div className="px-10 py-6">
                            <AuthHeader type="signin"></AuthHeader>
                        </div>
                        <div className="mt-5 pb-6">
                            <LabelledInput onChange={(e) => {
                                setPostInputs(c => {
                                    return {
                                        ...c,
                                        email: e.target.value
                                    }
                                })
                            }} placeholder="m@example.com" label="Email" type="email" />
                            <LabelledInput onChange={(e) => {
                                setPostInputs(c => {
                                    return {
                                        ...c,
                                        password: e.target.value
                                    }
                                })
                            }} placeholder="123456" label="Password" type="password" />
                            <Button label="Sign In" onClick={() => {signin() }}></Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden md:block">
                <Quote></Quote>
            </div>
        </div>
    )
}

