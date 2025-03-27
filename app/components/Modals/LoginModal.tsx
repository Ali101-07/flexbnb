'use client';

import { useState } from "react";
import Modals from "./Modals";
import UseLoginModal from "@/app/Hooks/UseLoginModal";
import { CLIENT_STATIC_FILES_RUNTIME_AMP } from "next/dist/shared/lib/constants";
const LoginModal=() => {
    const LoginModal = UseLoginModal()

    const Content =(
        <h2 className="mb-6 text-2xl">Welcome To FlexBnB,Please Log-In</h2>
    )
    return (
        <Modals
           isOpen={LoginModal.isOpen}
           close={LoginModal.close}
           label="Log-In"
           Content={Content}
        />   
    )

}
export default LoginModal;