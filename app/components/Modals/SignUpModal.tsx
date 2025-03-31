"use client";

import Modals from "./Modals";
import { useState } from "react";
import UseSignUpModal from "@/app/Hooks/UseSignUpModal";
import CustomButton from "../Forms/CustomButton";


const SignUpModal = () => {
    const SignUpModal = UseSignUpModal(); // Renamed to avoid conflict

    const Content = (
        <>
            <h2 className="mb-6 text-2xl">Welcome To FlexBnB, Please Sign-Up</h2>

            <form className="space-y-4">
                <input placeholder="Your Email Address" type="email" className="mb-4 px-4 w-full h-[54px] border border-gray-300 rounded-xl" />

                <input placeholder="Your Password" type="email" className="mb-4 px-4 w-full h-[54px] border border-gray-300 rounded-xl" />

                <input placeholder="Repeat Password" type="email" className="mb-4 px-4 w-full h-[54px] border border-gray-300 rounded-xl" />

                <div className="p-5 bg-red-500 text-white rounded-xl opacity-80">
                    The Error Message
                </div>
                <CustomButton
                    label="Sign-Up"
                    onClick={()=>console.log('test')}
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