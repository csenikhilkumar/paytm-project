import { useEffect, useRef, type ReactElement } from "react";
import Input from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useNavigate, type data } from "react-router-dom";

export function SignUp(){
    const inputRef1 = useRef<HTMLInputElement>(null)
    const inputRef2  = useRef<HTMLInputElement>(null)
    const inputRef3  = useRef<HTMLInputElement>(null)
    
    const navigate = useNavigate()
    console.log(inputRef1)
    return(
        <div className="flex h-screen w-screen bg-black justify-center items-center">
            
            <div className=" h-144 bg-white rounded-lg w-72 flex flex-col justify-center  items-center p-2">
                <h3><b>SignUp</b></h3>
                <div className=" border border-black rounded-md ">
                <div>
                    <Input lable={"userName"} text={"enter username"} ref={inputRef1}></Input>
                </div>
                <div>
                    <Input lable={"Email"} text={"enter email"} ref={inputRef2}></Input>
                </div>
                <div>
                    <Input lable={"password"} text={"enter password"} ref={inputRef3}></Input>
                </div>
                </div>
                <div>
                    <Button text="SignUp" onClick={()=>{
                         axios.post("http://localhost:3000/api/v1/signUp",{
                                "username":inputRef1.current?.value,
                                "email":inputRef2.current?.value,
                                "password":inputRef3.current?.value

                            }).then(res=>{
                                const token = res.data.token
                                localStorage.setItem("token",token)
                                navigate("/signIn")
                                console.log("token stored in ls",token)
                            }).catch(err =>{
                                console.log("signUp field",err)
                            })
                        }
                    } ></Button>
                </div>
                <div className=" text-sm pt-3">
                    if you have allready account ? <a className="text-blue-700" href="http://localhost:5173/SignIn">SignIn</a>
                </div>
            </div>
           

        </div>
    )
}