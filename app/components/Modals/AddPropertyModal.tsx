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
import { toast } from 'react-toastify';

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
  const { getToken, isSignedIn } = useAuth(); // Use hook inside the component

  const setCategory = (category: string) => setDataCategory(category);

  const setImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setDataImage(event.target.files[0]);
    }
  };

  const submitForm = async () => {
    if (!isSignedIn) {
      toast.error('You must be signed in to add a property.');
      return;
    }

    try {
      console.log('Starting form submission...');
      
      // Get token with the correct template name
      const token = await getToken({
        template: 'flexbnb_property_api'
      });
      
      console.log('Got token:', token ? 'Token received' : 'No token');
      
      if (!token) {
        toast.error('Authentication failed. Please try signing in again.');
        return;
      }

      // Validate required fields and types
      if (!dataCountry || !dataImage) {
        toast.error('Please fill in all required fields');
        return;
      }

      const requiredFields = {
        category: dataCategory,
        title: dataTitle,
        description: dataDescription,
        price: dataPrice,
        country: dataCountry.label,
        image: dataImage
      };

      console.log('Form data:', {
        ...requiredFields,
        image: dataImage ? dataImage.name : null,
        bedrooms: dataBedrooms,
        bathrooms: dataBathrooms,
        guests: dataGuests
      });

      const missingFields = Object.entries(requiredFields)
        .filter(([_, value]) => !value)
        .map(([key]) => key);

      if (missingFields.length > 0) {
        toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
        return;
      }

      const formData = new FormData();
      formData.append('category', dataCategory);
      formData.append('title', dataTitle);
      formData.append('description', dataDescription);
      formData.append('price_per_night', dataPrice);
      formData.append('bedrooms', dataBedrooms || '0');
      formData.append('bathrooms', dataBathrooms || '0');
      formData.append('guests', dataGuests || '0');
      formData.append('country', dataCountry.label);
      formData.append('country_code', dataCountry.value);
      formData.append('image', dataImage);

      console.log('Submitting to API...');
      const response = await apiService.post('/api/properties/create/', formData, token);
      console.log('API Response:', response);

      if (response.success) {
        toast.success(response.message || 'Property added successfully!');
        router.refresh(); // Refresh the page to show the new property
        addPropertyModal.close();
      } else {
        // Handle known error responses
        if (response.errors) {
          Object.entries(response.errors).forEach(([field, error]) => {
            const errorMessage = Array.isArray(error) ? error.join(', ') : String(error);
            toast.error(`${field}: ${errorMessage}`);
          });
        } else {
          toast.error(response.message || 'Failed to add property');
        }
      }
    } catch (err: any) {
      console.error('Detailed form submission error:', {
        error: err,
        message: err.message,
        status: err.status,
        response: err.response,
      });
      
      // Handle different types of errors
      if (err.status === 401 || err.status === 403) {
        toast.error('Authentication failed. Please sign in again.');
      } else if (err.errors) {
        // Handle validation errors
        Object.entries(err.errors).forEach(([field, error]) => {
          const errorMessage = Array.isArray(error) ? error.join(', ') : String(error);
          toast.error(`${field}: ${errorMessage}`);
        });
      } else {
        toast.error(err.message || 'An unexpected error occurred. Please try again.');
      }
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

