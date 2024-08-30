import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useState } from "react";

export const Signin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignInClick = async () => {

      try{
        const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
          username : email,
          password : password,
        });
        console.log(response.data);
        if(response.data.token) {
          localStorage.setItem("token", response.data.token);
          navigate('/dashboard');
        }else{
          setError("Invalid Credentials")
        }
      } catch(e) {
        setError("Invalid Credentials");
      }

    }

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox placeholder="harkirat@gmail.com" label={"Email"} onChange={(e) => setEmail(e.target.value)} />
        <InputBox placeholder="123456" label={"Password"} onChange={(e) => setPassword(e.target.value)}/>
        {error && <div className="text-red-500">{error}</div>}
        <div className="pt-4">
          <Button label={"Sign in"} onClick={handleSignInClick}  />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}