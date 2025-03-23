const ReservationSideBar =() =>{
    return(
        <aside className="h-[380px] w-[400px] mt-6 py-6  col-span-2 rounded-xl border border-gray-300 shadow-xl">
            <h2 className="mb-5 text-2xl m-3">200$ per night</h2>
            <div className="h-[50px] mb-6 m-2 pb-3 border border-gray-400 
            rounded-xl">
                <label className="block font-semibold text-xs p-1">Guests</label>
                <select className="w-full   text-xm flex items-center">
                    <option >1</option>
                    <option >2</option>
                    <option >3</option>
                    <option >4</option>
                    <option >5</option>
                    <option >6</option>
                </select>
                
            </div>
            <div className="cursor-pointer reservebtn  h-[60px] w-[250px]  flex items-center justify-center text-white font-semibold bg-red-500 hover:bg-red-900 rounded-xl">Reserve</div>
            <div className="m-3 mb-4 flex justify-between align-center">
                <p>200$ * 4Nights</p>
                <p>800$</p>
            </div>
            <div className="m-3 mb-4 flex justify-between align-center">
                <p>FlexBnb Fee</p>
                <p>40$</p>
            </div>
            <div className="m-3 mb-4 flex justify-between align-center">
                <p>Total Amount</p>
                <p>840$</p>
            </div>
        </aside>
    )
}
export default ReservationSideBar;