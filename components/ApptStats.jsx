"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ApptStats() {
  const [appointmentStats, setAppointmentStats] = useState({
    Pending: 0,
    Approved: 0,
    Cancelled: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/get_stats');
        const data = await response.json();
        setAppointmentStats(data);
      } catch (err) {
        console.error("Failed to fetch appointment stats:", err);
      }
    };

    //Initial fetch
    fetchStats();

    // Set up interval to refetch stats every 5 seconds
    const intervalId = setInterval(fetchStats, 3000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="status_container w-full mt-4 flex flex-row align-middle justify-between sm:justify-around md:flex-col ">
      <div className="status_type mt-4 px-2 py-2 bg-input-bg rounded-md w-20 sm:w-36 md:w-full">
        <div className="stat_head md:w-full flex align-middle justify-between opacity-75">
          <span className="text-Pending-clr text-base md:text-xl font-semibold hidden md:block">Pending</span>
          <span>
            <Image 
            src="assets/Pending.svg"
            width={28}
            height={28}
            alt="pending"
            />
          </span>
        </div>

        <div className="stat_no opacity-80 flex align-middle justify-center w-full md:h-20 text-4xl md:text-6xl text-Pending-clr font-semibold">
          {appointmentStats.Pending}
        </div>
      </div>

      <div className="stat4s_type mt-4 px-2 py-2 bg-input-bg rounded-md w-20 sm:w-36 md:w-full">
        <div className="stat_head w-full flex align-middle justify-between opacity-75">
          <span className="text-Approved-clr text-base hidden md:block md:text-xl font-semibold">Approved</span>
          <span>
            <Image 
            src="assets/Approved.svg"
            width={24}
            height={24}
            alt="pending"
            />
          </span>
        </div>

        <div className="stat_no opacity-80 flex align-middle justify-center w-full md:h-20 text-4xl md:text-6xl text-Approved-clr font-semibold">
          {appointmentStats.Approved}
        </div>
      </div>

      <div className="status_type mt-4 px-2 py-2 bg-input-bg rounded-md w-20 sm:w-36 md:w-full">
        <div className="stat_head w-full flex align-middle justify-between opacity-75">
          <span className="text-Cancelled-clr hidden md:block text-base md:text-xl font-semibold">Cancelled</span>
          <span>
            <Image 
            src="assets/Cancelled.svg"
            width={24}
            height={24}
            alt="pending"
            />
          </span>
        </div>

        <div className="stat_no opacity-80 flex align-middle justify-center w-full md:h-20 text-4xl md:text-6xl text-Cancelled-clr font-semibold">
          {appointmentStats.Cancelled}
        </div>
      </div>
    </div>
  )
}
