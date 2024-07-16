"use client"

import Image from 'next/image';
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';

export default function MyAppointments() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`/api/getAppt/${session?.user.id}`, {
          method: 'GET'
        });

        if (res.ok) {
          const data = await res.json();
          setAppointments(data);
          setLoading(false);
        } else {
          console.error('Failed to fetch appointments');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [session]);

  if (loading) {
    return <div className="text-primary-azure opacity-60 text-lg">Loading...</div>;
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
    <div className="my_appointments mt-4 w-full">
      {appointments.map((appt) => (
        <div key={appt.id} className="bg-appt-bg p-2 mt-4 rounded-md w-full">
          <div className="flex justify-start align-middle">
            <span className="text-primary-azure font-semibold sm:text-lg opacity-60">{session.user.name}'s</span>
            <span className="text-primary-azure text-sm opacity-50 ml-2 sm:ml-4 mt-2">appointment with</span>
            <span className="text-primary-azure font-semibold sm:text-lg opacity-60 ml-2 sm:ml-4">{appt.doctor}</span>
          </div>

          <div className="flex justify-start align-middle mt-2">
            <div className="text-xs font-semibold text-blue opacity-60">Appt Date: <span>{new Date(appt.apptDate).toLocaleString()}</span></div>
            <div className="text-xs font-semibold text-blue opacity-60 ml-4">Created at: <span>{new Date(appt.createdAt).toLocaleString()}</span></div>
          </div>

          <div className="mt-4 text-primary-azure opacity-40 text-sm">{appt.reason}</div>
          <div className="status flex align-middle justify-end px-4 py-2">
            <span>
              <Image 
                src={`/assets/${appt.apptStatus}.svg`}
                width={18}
                height={18}
                alt={appt.status}
                className="mr-2 opacity-70"
              />
            </span>
            <span className={`text-${appt.apptStatus}-clr opacity-70 text-sm font-semibold`}>{appt.apptStatus}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
