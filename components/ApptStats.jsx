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

    // Set up interval to refetch stats every 30 seconds
    const intervalId = setInterval(fetchStats, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      {/* Pending Card */}
      <div className="bg-bg-dark rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-all duration-300">
        <div className="bg-Pending-clr bg-opacity-10 p-3 border-b border-Pending-clr border-opacity-20">
          <div className="flex items-center justify-between">
            <h3 className="text-Pending-clr font-medium text-sm md:text-base">Pending</h3>
            <div className="w-8 h-8 rounded-full bg-Pending-clr bg-opacity-20 hidden sm:flex items-center justify-center">
              <Image
                src="/assets/Pending.svg"
                width={18}
                height={18}
                alt="Pending"
                className="opacity-80"
              />
            </div>
          </div>
        </div>
        <div className="p-4 text-center">
          <div className="text-3xl md:text-4xl font-bold text-Pending-clr">
            {appointmentStats.Pending}
          </div>
          <p className="text-xs text-text-secondary mt-1">Awaiting Review</p>
        </div>
      </div>

      {/* Approved Card */}
      <div className="bg-bg-dark rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-all duration-300">
        <div className="bg-Approved-clr bg-opacity-10 p-3 border-b border-Approved-clr border-opacity-20">
          <div className="flex items-center justify-between">
            <h3 className="text-Approved-clr font-medium text-sm md:text-base">Approved</h3>
            <div className="w-8 h-8 rounded-full bg-Approved-clr bg-opacity-20 hidden sm:flex items-center justify-center">
              <Image
                src="/assets/Approved.svg"
                width={18}
                height={18}
                alt="Approved"
                className="opacity-80"
              />
            </div>
          </div>
        </div>
        <div className="p-4 text-center">
          <div className="text-3xl md:text-4xl font-bold text-Approved-clr">
            {appointmentStats.Approved}
          </div>
          <p className="text-xs text-text-secondary mt-1">Confirmed Appointments</p>
        </div>
      </div>

      {/* Cancelled Card */}
      <div className="bg-bg-dark rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-all duration-300">
        <div className="bg-Cancelled-clr bg-opacity-10 p-3 border-b border-Cancelled-clr border-opacity-20">
          <div className="flex items-center justify-between">
            <h3 className="text-Cancelled-clr font-medium text-sm md:text-base">Cancelled</h3>
            <div className="w-8 h-8 rounded-full bg-Cancelled-clr bg-opacity-20 hidden sm:flex items-center justify-center">
              <Image
                src="/assets/Cancelled.svg"
                width={18}
                height={18}
                alt="Cancelled"
                className="opacity-80"
              />
            </div>
          </div>
        </div>
        <div className="p-4 text-center">
          <div className="text-3xl md:text-4xl font-bold text-Cancelled-clr">
            {appointmentStats.Cancelled}
          </div>
          <p className="text-xs text-text-secondary mt-1">Cancelled Appointments</p>
        </div>
      </div>
    </div>
  )
}
