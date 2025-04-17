'use client';

import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { useState, ChangeEvent } from "react";
import Categories from "../addproperty/Category";
import apiService from "../services/apiService";
import Modals from "./Modals";
import { useRouter } from "next/navigation";
import UseAddPropertyModal from "@/app/Hooks/UseAddPropertyModal";
import CustomButton from "../Forms/CustomButton";
import SelectCountry, { SelectCountryValue } from "../Forms/SelectCountry";

const AddPropertyModal = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [dataCategory, setDataCategory] = useState("");
  const [dataTitle, setDataTitle] = useState("");
  const [dataDescription, setDataDescription] = useState("");
  const [dataPrice, setDataPrice] = useState("");
  const [dataBedrooms, setDataBedrooms] = useState("");
  const [dataBathrooms, setDataBathrooms] = useState("");
  const [dataGuests, setDataGuests] = useState("");
  const [dataCountry, setDataCountry] = useState<SelectCountryValue>();
  const [dataImage, setDataImage] = useState<File | null>(null);

  const addPropertyModal = UseAddPropertyModal();
  const router = useRouter();
  const { getToken } = useAuth(); // ✅ Use hook inside component

  const setCategory = (category: string) => setDataCategory(category);

  const setImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setDataImage(event.target.files[0]);
    }
  };

  const submitForm = async () => {
    console.log('submitForm');

    if (
      dataCategory &&
      dataTitle &&
      dataDescription &&
      dataPrice &&
      dataCountry &&
      dataImage
    ) {
      const formData = new FormData();
      formData.append('category', dataCategory);
      formData.append('title', dataTitle);
      formData.append('description', dataDescription);
      formData.append('price_per_night', dataPrice);
      formData.append('bedrooms', dataBedrooms);
      formData.append('bathrooms', dataBathrooms);
      formData.append('guests', dataGuests);
      formData.append('country', dataCountry.label);
      formData.append('country_code', dataCountry.value);
      formData.append('image', dataImage);

    //   try {
    //     const token = await getToken({ template: 'Integration_flexbnb' }); // ✅ Auth template
    //     if (token === null) {
    //       throw new Error('Failed to obtain token');
    //     }
        const response = await apiService.postWithoutToken('/api/properties/create/', formData); //token ayai ga form data ke baad
      

//         if (response.success) {
//           console.log('SUCCESS :-D');
//           router.push('/?added=true');
//           addPropertyModal.close();
//         } else {
//           console.log('Error', response);
//         }
//       } catch (err) {
//         console.error('Error submitting form:', err);
//       }
   }
  };

  const content = (
    <>
      {currentStep === 1 ? (
        <>
          <h2 className="mb-6 text-2xl">Choose Category</h2>
          <Categories dataCategory={dataCategory} setCategory={setCategory} />
          <CustomButton label="Next" onClick={() => setCurrentStep(2)} />
        </>
      ) : currentStep === 2 ? (
        <>
          <h2 className="mb-6 text-2xl">Describe Your Place</h2>
          <div className="pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label>Title</label>
              <input
                type="text"
                value={dataTitle}
                onChange={(e) => setDataTitle(e.target.value)}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label>Description</label>
              <textarea
                value={dataDescription}
                onChange={(e) => setDataDescription(e.target.value)}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>
          </div>
          <CustomButton label="Previous" className="!mb-2 !bg-black hover:!bg-gray-800" onClick={() => setCurrentStep(1)} />
          <CustomButton label="Next" onClick={() => setCurrentStep(3)} />
        </>
      ) : currentStep === 3 ? (
        <>
          <h2 className="mb-6 text-2xl">Details</h2>
          <div className="pt-3 pb-6 space-y-4">
            {['Price Per Night', 'Bedrooms', 'Bathrooms', 'Guests'].map((label, index) => {
              const stateSetters = [setDataPrice, setDataBedrooms, setDataBathrooms, setDataGuests];
              const values = [dataPrice, dataBedrooms, dataBathrooms, dataGuests];
              return (
                <div key={label} className="flex flex-col space-y-2">
                  <label>{label}</label>
                  <input
                    type="number"
                    value={values[index]}
                    onChange={(e) => stateSetters[index](e.target.value)}
                    className="w-full h-[20px] p-4 border border-gray-600 rounded-xl"
                  />
                </div>
              );
            })}
          </div>
          <CustomButton label="Previous" className="!mb-2 !bg-black hover:!bg-gray-800" onClick={() => setCurrentStep(2)} />
          <CustomButton label="Next" onClick={() => setCurrentStep(4)} />
        </>
      ) : currentStep === 4 ? (
        <>
          <h2 className="mb-6 text-2xl">Location</h2>
          <div className="pt-3 pb-6 space-y-4">
            <SelectCountry value={dataCountry} onChange={(value) => setDataCountry(value as SelectCountryValue)} />
          </div>
          <CustomButton label="Previous" className="!mb-2 !bg-black hover:!bg-gray-800" onClick={() => setCurrentStep(3)} />
          <CustomButton label="Next" onClick={() => setCurrentStep(5)} />
        </>
      ) : (
        <>
          <h2 className="mb-6 text-2xl">Image</h2>
          <div className="pt-3 pb-6 space-y-4">
            <div className="py-4 px-6 bg-gray-600 text-white rounded-xl">
              <input type="file" accept="image/*" onChange={setImage} />
            </div>
            {dataImage && (
              <div className="w-[200px] h-[150px] relative">
                <Image
                  fill
                  alt="Uploaded image"
                  src={URL.createObjectURL(dataImage)}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            )}
          </div>
          <CustomButton label="Previous" className="!mb-2 !bg-black hover:!bg-gray-800" onClick={() => setCurrentStep(4)} />
          <CustomButton label="Submit" onClick={submitForm} />
        </>
      )}
    </>
  );

  return (
    <Modals
      isOpen={addPropertyModal.isOpen}
      close={addPropertyModal.close}
      label="Add Property"
      Content={content}
    />
  );
};

export default AddPropertyModal;

