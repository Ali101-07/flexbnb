"use client";

import Modals from "./Modals";
import { useState } from "react";
import UseLoginModal from "@/app/Hooks/UseLoginModal";
import CustomButton from "../Forms/CustomButton";


const LoginModal = () => {
    const loginModal = UseLoginModal(); // Renamed to avoid conflict

    const Content = (
        <>
            <h2 className="mb-6 text-2xl">Welcome To FlexBnB, Please Log-In</h2>

            <form className="space-y-4">
                <input placeholder="Your Email Address" type="email" className="mb-4 px-4 w-full h-[54px] border border-gray-300 rounded-xl" />

                <input placeholder="Your Password" type="email" className="mb-4 px-4 w-full h-[54px] border border-gray-300 rounded-xl" />

                <div className="p-5 bg-red-500 text-white rounded-xl opacity-80">
                    The Error Message
                </div>
                <CustomButton
                    label="Log-In"
                    onClick={()=>console.log('test')}
                />
                 
            </form>
        </>
    );

    return (
        <Modals
            isOpen={loginModal.isOpen}
            close={loginModal.close}
            label="Log-In"
            Content={Content} // Fixed prop name
        />
    );
};

export default LoginModal;
