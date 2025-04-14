'use client';

import Image from "next/image";
import { useState } from "react";
import Categories from "../addproperty/Category";
import Modals from "./Modals";
import UseAddPropertyModal from "@/app/Hooks/UseAddPropertyModal";
import CustomButton from "../Forms/CustomButton";

const AddPropertyModal = ()=>{
    //
    //states
    const [currentStep,setCurrentStep]=useState(1);
    const [dataCategory, setDataCategory] = useState("");
    //
    //
    const addPropertyModal = UseAddPropertyModal();
    //
    //set datas
    const setCategory=(category:string)=>{
        setDataCategory(category);
    }

    //
    //

    const content=(
        <>
            {currentStep==1?(
            <>    
                <h2 className="mb-6 text-2xl">Choose Category</h2>

                <Categories
                    dataCategory={dataCategory}
                    setCategory={(category)=>setCategory(category)}
                />

                <CustomButton
                    label='Next'
                    onClick={()=>setCurrentStep(2)}
                /> 
            </>
            ):(
                <p>Step 2</p>
            )}   
        </>
    )
    return(
        <>
           <Modals
                 isOpen={addPropertyModal.isOpen}
                 close={addPropertyModal.close}
                 label="Add Property"
                 Content={content}
            />
        </>
    )
}
export default AddPropertyModal;