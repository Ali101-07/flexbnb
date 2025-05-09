'use client';

import { useState } from 'react';

export type Property={
   id:string;
   price_per_night: number;
}

interface ReservationSideBarProps {
  userId: string | null,
  property: Property
}

const ReservationSideBar :React.FC<ReservationSideBarProps> = ({
   property,
}) => {
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [numberOfNights, setNumberOfNights] = useState(0);

  const calculateNights = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleDateChange = (date: string, type: 'checkIn' | 'checkOut') => {
    if (type === 'checkIn') {
      setCheckIn(date);
      if (checkOut) {
        setNumberOfNights(calculateNights(date, checkOut));
      }
    } else {
      setCheckOut(date);
      if (checkIn) {
        setNumberOfNights(calculateNights(checkIn, date));
      }
    }
  };

  const totalNightsCost = property.price_per_night * numberOfNights;
  const flexbnbFee = Math.round(totalNightsCost * 0.30); // 30% of total nights cost
  const totalAmount = totalNightsCost + flexbnbFee;

  return (
    <aside className="h-[480px] w-[400px] mt-6 py-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
      <h2 className="mb-5 text-2xl m-3">${property.price_per_night} per night</h2>
      
      {/* Guest Selection Box */}
      <div className="h-[50px] mb-6 m-2 pb-3 border border-gray-400 rounded-xl">
        <label className="block font-semibold text-xs p-1">Guests</label>
        <select className="w-full text-xm flex items-center" defaultValue={1}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>

      {/* Check-in/Check-out Box */}
      <div className="mb-6 mx-2">
        <div className="grid grid-cols-2 border border-gray-400 rounded-xl overflow-hidden">
          <div className="p-2 border-r border-gray-400">
            <label className="block font-semibold text-xs mb-1">CHECK-IN</label>
            <input 
              type="date" 
              className="w-full text-sm outline-none"
              min={new Date().toISOString().split('T')[0]}
              value={checkIn}
              onChange={(e) => handleDateChange(e.target.value, 'checkIn')}
            />
          </div>
          <div className="p-2">
            <label className="block font-semibold text-xs mb-1">CHECKOUT</label>
            <input 
              type="date" 
              className="w-full text-sm outline-none"
              min={checkIn || new Date().toISOString().split('T')[0]}
              value={checkOut}
              onChange={(e) => handleDateChange(e.target.value, 'checkOut')}
            />
          </div>
        </div>
      </div>

      <div className="cursor-pointer reservebtn h-[60px] w-[250px] mx-auto flex items-center justify-center text-white font-semibold bg-red-500 hover:bg-red-900 rounded-xl">
        Reserve
      </div>

      {numberOfNights > 0 && (
        <>
          <div className="m-3 mb-4 flex justify-between align-center">
            <p>${property.price_per_night} × {numberOfNights} nights</p>
            <p>${totalNightsCost}</p>
          </div>
          <div className="m-3 mb-4 flex justify-between align-center">
            <p>FlexBnb Fee</p>
            <p>${flexbnbFee}</p>
          </div>
          <div className="m-3 mb-4 flex justify-between align-center font-bold">
            <p>Total Amount</p>
            <p>${totalAmount}</p>
          </div>
        </>
      )}
    </aside>
  );
};

export default ReservationSideBar;