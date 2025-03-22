import Image from "next/image";
const HostDetailPage=()=>{
    return(
        <main className="max-w[1500px] mx-auto pv-6 pb-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <aside className="col-span-1 mb-4 p-4">
                        <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl">
                            <Image
                              src="/aliimgFinal.jpeg"
                              width={200}
                              height={200}
                              alt="Landlordimg"
                              className="rounded-full"
                              />
                        </div>
                    </aside>
                    <div className="col-span-3 pl-0 md:pl-6">
                        sdadsa
                    </div>
            </div>
        </main>
    )
}
export default HostDetailPage;