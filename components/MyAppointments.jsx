"use client"

import Image from 'next/image';
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function MyAppointments() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAppointments = async () => {
    if (!session?.user.id) return;

    try {
      setLoading(true);
      setError('');

      const res = await fetch(`/api/getAppt/${session.user.id}`, {
        method: 'GET'
      });

      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      } else {
        setError('Failed to fetch appointments');
        console.error('Failed to fetch appointments');
      }
    } catch (error) {
      setError('Error loading appointments');
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user.id) {
      fetchAppointments();

      // Set up polling for real-time updates
      const intervalId = setInterval(() => {
        fetchAppointments();
      }, 30000); // Poll every 30 seconds

      return () => clearInterval(intervalId);
    }
  }, [session]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <LoadingSpinner size="medium" text="Loading your appointments..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-Cancelled-clr text-center py-4">
        {error}
        <button
          onClick={fetchAppointments}
          className="ml-4 px-3 py-1 bg-input-bg rounded-md text-primary-azure hover:bg-eerie-black"
        >
          Retry
        </button>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="empty_appt">
        <Image
          src="/assets/folder-empty.svg"
          width={36}
          height={36}
          alt="empty appts"
        />
        <span className="text-lg text-primary-azure opacity-30">No appointments yet</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-4">
      {appointments.map((appt) => (
        <div key={appt._id} className="bg-bg-dark rounded-lg shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300 border border-border">
          {/* Card Header with Status */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-bg-card">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full bg-${appt.apptStatus}-clr mr-2.5`}></div>
              <h3 className="text-base font-semibold text-text-primary truncate max-w-[180px]">{appt.doctor}</h3>
            </div>
            <div className="flex items-center">
              <div className={`px-3 py-1 rounded-full text-xs font-medium bg-${appt.apptStatus}-clr bg-opacity-20 text-${appt.apptStatus}-clr`}>
                {appt.apptStatus}
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4">
            {/* Appointment Details */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-text-secondary mb-1.5">Reason for Visit</h4>
              <p className="text-sm text-text-primary">{appt.reason}</p>
            </div>

            {/* Date Information */}
            <div className="mb-3">
              <div className="bg-bg-card rounded-md p-3 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-primary mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <span className="text-sm font-medium text-text-secondary block mb-1">Appointment Date</span>
                  <p className="text-sm text-text-primary">{new Date(appt.apptDate).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Cancellation Reason */}
            {appt.apptStatus === "Cancelled" && appt.cancellationReason && (
              <div className="mt-3 bg-Cancelled-clr bg-opacity-10 p-3 rounded-md border-l-3 border-Cancelled-clr">
                <h4 className="text-sm font-semibold text-Cancelled-clr mb-1.5 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Cancellation Reason
                </h4>
                <p className="text-sm text-Cancelled-clr ml-5">{appt.cancellationReason}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
