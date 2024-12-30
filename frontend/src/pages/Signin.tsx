import { useState } from "react";
import {
  AuthHeader,
  ButtonLoading,
  LabelledInput,
} from "../components/Auth";

import { Quote } from "../components/Quote";
import axios from "axios";
import { BASE_URL } from "../config";
import { SigninInput } from "@sadiqgurramkonda/medium-common";
import { useNavigate } from "react-router-dom";
import { ErrorLabel } from "../components/ErrorLabel";
import { useRecoilState, } from "recoil";
import { currentUserState } from "../store/blogs";

export const Signin = () => {
  const navigate = useNavigate();
  const [errormsg, setErrormsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [postInputs, setPostInputs] = useState<SigninInput>({
    email: "",
    password: "",
  });
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);


  const signin = async () => {
    if(!postInputs.email || !postInputs.password) return
    let response;
    try {
      setIsLoading(true);
      response = await axios.post(`${BASE_URL}/user/signin`, postInputs);
      // console.log(response);
      setCurrentUser(response?.data.userDetails)
      localStorage.setItem("token", response.data.token);
      navigate("/blogs");
    } catch (err: any) {

      setErrormsg(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="h-screen flex flex-col bg-slate-300 justify-center">
        <div className="flex justify-center">
          <div className="bg-white rounded-lg px-6">
            <div className="px-10 py-6">
              <AuthHeader type="signin"></AuthHeader>
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
                label="Sign In"
                onClick={signin}
                isLoading={isLoading}
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
