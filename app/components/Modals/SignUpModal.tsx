"use client";

import Modals from "./Modals";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UseSignUpModal from "@/app/Hooks/UseSignUpModal";
import CustomButton from "../Forms/CustomButton";
import apiService from "../services/apiService";
import { handleLogin } from "@/app/lib/actions";


const SignUpModal = () => {
    //
    // variables

    const router=useRouter();
    const SignUpModal = UseSignUpModal();
    const [email, setEmail] = useState('');
    const [Password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    //
    // submit functionalities

    const submitSignup = async () => {
        const formData = {
            email: email,
            password1: Password1,
            password2: password2
        }

        const response = await apiService.post('/api/auth/register/',JSON.stringify(formData));

        if(response.access){
            handleLogin(response.user.pk, response.access, response.refresh);
            
            SignUpModal.close();

            router.push('/')
        } else{
            const tmpErrors: string[]= Object.values(response).map((error: any) =>{
                return error;
            })

            setErrors(tmpErrors);
        }
    }
    const Content = (
        <>
            <h2 className="mb-6 text-2xl">Welcome To FlexBnB, Please Sign-Up</h2>

            <form
                action={submitSignup} 
                className="space-y-4"
            >
                <input onChange={(e)=>setEmail(e.target.value)} placeholder="Your Email Address" type="email" className="mb-4 px-4 w-full h-[54px] border border-gray-300 rounded-xl" />

                <input onChange={(e)=>setPassword1(e.target.value)} placeholder="Your Password" type="password" className="mb-4 px-4 w-full h-[54px] border border-gray-300 rounded-xl" />

                <input onChange={(e)=>setPassword2(e.target.value)} placeholder="Repeat Password" type="password" className="mb-4 px-4 w-full h-[54px] border border-gray-300 rounded-xl" />

                {errors.map((error, index) => {
                    return (
                        <div key={`error_${index}`} 
                            className="p-5 bg-red-500 text-white rounded-xl opacity-80"
                        >
                            {error}
                        </div>
                    )
                    })}
                
                <CustomButton
                    label="Sign-Up"
                    onClick={submitSignup}
                />
                 
            </form>
        </>
    );

    return (
        <Modals
            isOpen={SignUpModal.isOpen}
            close={SignUpModal.close}
            label="Sign-Up"
            Content={Content} // Fixed prop name
        />
    );
};

export default SignUpModal;