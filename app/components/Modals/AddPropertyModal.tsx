'use client';

import Image from "next/image";
import Modals from "./Modals";
import UseAddPropertyModal from "@/app/Hooks/UseAddPropertyModal";

const AddPropertyModal = ()=>{
    const addPropertyModal = UseAddPropertyModal();

    return(
        <>
           <Modals
                 isOpen={addPropertyModal.isOpen}
                 close={addPropertyModal.close}
                 label="Add Property"
                 Content={(
                    <p>heheheheheh</p>
                 )}
            />
        </>
    )
}
export default AddPropertyModal;