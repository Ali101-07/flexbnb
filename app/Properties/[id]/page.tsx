import Image from "next/image";
import ReservationSideBar from "@/app/components/Properties/ReservationSideBar";
const PropertyDetailPage=() =>{
    return(
       <main className="max-w-[1500px]  mx-auto px-6 pt-[20px] ">
           <div className=" w-full h-[64vh] overflow-hidden rounded-xl  relative ">
              <Image
              fill
              src="/HouseDemo1.jpg"
              alt="aaaaa"
              className="object-cover "
              
              />
            </div>
           <div className="mt-4 grid grid-cols-4 md:grid-cols-5 gap-4">
              <div className="py-6 pr-6 col-span-3">
                <h1 className="mb-4 text-4xl ">Property Name</h1>
                <span className="mb-6 block text-lg text-gray-600">
                    4 Guests - 2 Bedrooms - 2 Bathrooms
                </span>
                <hr />
                <div className="py-6 flex items-center space-x-4">
                    <Image
                      src="/PP.jpg"
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt="ppimg"
                      />
                      <p><strong>Elsa</strong> Is Your Host</p>
                     
                </div>
                <hr />  
                    <p className="mt-6 text-lg break-words">
                        djsahdhdsahdsahdiqdhwqihdjshdjadhiwdhisdhsajdhaskjdhashdkjshdjkshkjahdkjsahdjkahdkjsahjahdjsahajshjsahjsahdjsahdjsahdjsahdjsahd
                    </p>
              </div>
            <div>
                <ReservationSideBar/>
            </div>
           </div>
       </main>
    )
}
export default PropertyDetailPage;