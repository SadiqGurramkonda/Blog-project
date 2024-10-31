import { SignupInput } from "@sadiqgurramkonda/medium-common";
import { useState } from "react";
import {
  AuthHeader,
  Button,
  ButtonLoading,
  LabelledInput,
} from "../components/Auth";
import { Quote } from "../components/Quote";
import axios, { isAxiosError } from "axios";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ErrorLabel } from "../components/ErrorLabel";
import { useRecoilState } from "recoil";
import { currentUserState } from "../store/blogs";

export const Signup = () => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    email: "",
    name: "",
    password: "",
  });
  const [errormsg, setErrormsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);


  const signupUser = async () => {
    let response;

    try {
      setIsLoading(true);
      response = await axios.post(`${BASE_URL}/user/signup`, postInputs);
      localStorage.setItem("token", response.data.token);
      setCurrentUser(response?.data.userDetails);
      setIsLoading(false);
      navigate("/blogs");
    } catch (err: any) {
      console.log(err);
      setErrormsg(err.response.data.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="h-screen flex flex-col bg-slate-300 justify-center">
        {/* {JSON.stringify({postInputs})} */}
        <div className="flex justify-center">
          <div className="bg-white rounded-lg px-6">
            <div className="px-10 py-6 ">
              <AuthHeader type="signup"></AuthHeader>
            </div>
            <div className="mt-5 pb-6">
              {errormsg && <ErrorLabel errormsg={errormsg} />}
              <LabelledInput
                onChange={(e) => {
                  setPostInputs((c) => {
                    return {
                      ...c,
                      email: e.target.value,
                    };
                  });
                }}
                placeholder="m@example.com"
                label="Email"
                type="text"
              />
              <LabelledInput
                onChange={(e) => {
                  setPostInputs((c) => {
                    return {
                      ...c,
                      name: e.target.value,
                    };
                  });
                }}
                placeholder="Enter your username"
                label="User name"
                type="email"
              />
              <LabelledInput
                onChange={(e) => {
                  setPostInputs((c) => {
                    return {
                      ...c,
                      password: e.target.value,
                    };
                  });
                }}
                placeholder="123456"
                label="Password"
                type="password"
              />
              <ButtonLoading
              isLoading = {isLoading}
                label={isLoading?"Signing Up": "Sign Up"}
                onClick={() => {
                  signupUser(); 
                }}
              ></ButtonLoading>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <Quote></Quote>
      </div>
    </div>
  );
};
