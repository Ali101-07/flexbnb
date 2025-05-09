'use client';

import { useState, useCallback } from 'react';
import { Range, RangeKeyDict } from 'react-date-range';
import Calendar from '../Calendar/Calendar';
import { format } from 'date-fns';

export type Property = {
  id: string;
  price_per_night: number;
}

interface ReservationSideBarProps {
  userId: string | null,
  property: Property
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

const ReservationSideBar: React.FC<ReservationSideBarProps> = ({
  property,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<Range[]>([initialDateRange]);

  const handleDateChange = (item: RangeKeyDict) => {
    setDateRange([item.selection]);
  };

  const numberOfNights = dateRange[0].endDate && dateRange[0].startDate
    ? Math.ceil(Math.abs(dateRange[0].endDate.getTime() - dateRange[0].startDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

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
        <div 
          onClick={() => setIsCalendarOpen(true)}
          className="grid grid-cols-2 border border-gray-400 rounded-xl overflow-hidden cursor-pointer"
        >
          <div className="p-2 border-r border-gray-400">
            <label className="block font-semibold text-xs mb-1">CHECK-IN</label>
            <div className="text-sm">
              {dateRange[0].startDate ? format(dateRange[0].startDate, 'MM/dd/yyyy') : 'Select date'}
            </div>
          </div>
          <div className="p-2">
            <label className="block font-semibold text-xs mb-1">CHECKOUT</label>
            <div className="text-sm">
              {dateRange[0].endDate ? format(dateRange[0].endDate, 'MM/dd/yyyy') : 'Select date'}
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Modal */}
      {isCalendarOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/70">
          <div className="relative w-full md:w-[500px] h-auto bg-white rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Select dates</h3>
              <button 
                onClick={() => setIsCalendarOpen(false)}
                className="p-2 hover:bg-neutral-100 rounded-full transition"
              >
                ✕
              </button>
            </div>
            <Calendar
              value={dateRange}
              onChange={handleDateChange}
            />
            <button
              onClick={() => setIsCalendarOpen(false)}
              className="w-full mt-4 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

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
          <hr />
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