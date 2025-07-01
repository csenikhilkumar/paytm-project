import { useRef, type ReactElement } from "react";
import Input from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignIn(){
    const inputRef1 : any = useRef<ReactElement>(null)
    const inputRef2 : any = useRef<ReactElement>(null)
    const inputRef3 : any = useRef<ReactElement>(null)
    const navigate = useNavigate()
    return(
        <div className="flex h-screen w-screen bg-black justify-center items-center">
            
            <div className=" h-144 bg-white rounded-lg w-72 flex flex-col justify-center  items-center p-2">
                <h3><b>SignIn</b></h3>
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
                    <Button text="SignIn" onClick={async ()=>{
                        const token =`Bearer ${localStorage.getItem("token")}`
                       await axios.post("http://localhost:3000/api/v1/signIn",
                            {
                                "username":inputRef1.current?.value,
                                "email":inputRef2.current?.value,
                                "password":inputRef3.current?.value

                            
                            },
                            { 
                                headers:{
                                    token :token
                                }
                                
                            }).then(()=>{
                                if(!token || !token.startsWith("Bearer")){
                                    alert("wrong credentials")
                                }
                                else{
                                    navigate("/dashboard")
                                }
                            })
                        }
                    }></Button>
                </div>
                <div className=" text-sm pt-3">
                    if you dont have account ? <a className="text-blue-700" href="http://localhost:5173/SignUp">SignUp</a>
                </div>
            </div>
           

        </div>
    )
}