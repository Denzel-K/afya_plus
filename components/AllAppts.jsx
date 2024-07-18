"use client"

import {useState, useEffect} from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";

export default function AllAppts() {
  const [appointments, setAppointments] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function fetchAllAppts(){
    try {
      const res = await fetch('/api/get_all_appts', {
        method: 'GET'
      })

      if(res.ok){
        const data = await res.json();
        setAppointments(data);
        setLoading(false);
      }
      else {
        console.error('Failed to fetch appointments');
      }
    } 
    catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }

  useEffect(() => {
    fetchAllAppts();
  }, [])

  async function handleApprove(apptId){
    const hasConfirmed = confirm("Confirm appointment approval");

    if(hasConfirmed){
      const res = await fetch(`/api/getAppt/${apptId}`, {
        method: 'PATCH',
        body: JSON.stringify({newStatus: 'Approved'}),
        headers: { 'Content-Type': 'application/json' }
      });

      if(res.ok){
        fetchAllAppts();
      }
    }
  }

  async function handleCancel(apptId){
    const hasConfirmed = confirm("Are sure you want to cancel this appointment?");

    if(hasConfirmed){
      const res = await fetch(`/api/getAppt/${apptId}`, {
        method: 'PATCH',
        body: JSON.stringify({newStatus: 'Cancelled'}),
        headers: { 'Content-Type': 'application/json' }
      });

      if(res.ok){
        fetchAllAppts();
      }
    }
  }

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
    <div className="all_appointments mt-4 w-full">
      {appointments.map((appt) => (
        <div key={appt.id} className="bg-appt-bg pt-4 px-2 mt-4 rounded-md w-full">
          <div className="flex justify-start align-middle">
            <span className="text-primary-azure font-semibold sm:text-lg opacity-50">{appt.createdBy}'s</span>
            <span className="text-primary-azure text-sm opacity-40 ml-2 sm:ml-4 mt-2">appointment with</span>
            <span className="text-primary-azure font-semibold sm:text-lg opacity-50 ml-2 sm:ml-4">{appt.doctor}</span>
          </div>

          <div className="flex justify-start align-middle flex-col sm:flex-row mt-4">
            <div className="text-xs font-semibold text-blue opacity-50">Appt Date: <span>{new Date(appt.apptDate).toLocaleString()}</span></div>
            <div className="text-xs font-semibold text-blue opacity-50 mt-2 sm:ml-4 sm:mt-0">Created at: <span>{new Date(appt.createdAt).toLocaleString()}</span></div>
          </div>

          <div className="mt-4 text-primary-azure opacity-55 text-sm">{appt.reason}</div>

          <div className="status flex align-middle justify-between py-2 mt-2 border-t-2 border-eerie-black">
            <div className="status flex align-middle justify-start py-2">
              <span>
              <Image 
                src={`/assets/${appt.apptStatus}.svg`}
                width={18}
                height={18}
                alt={appt.status}
                className="mr-2 opacity-70"
              />
            </span>
            <span className={`text-status-clr opacity-70 text-sm font-semibold`}>{appt.apptStatus}</span>
            </div>

            <div className="actions flex align-middle justify-center">
              {appt.apptStatus === "Pending" && (
                <>
                  <div className="p-2 w-10 h-10 rounded-full flex align-middle justify-center mr-4 bg-eerie-black hover:bg-input-bg hover:cursor-pointer">
                    <Image 
                      className="opacity-70"
                      src="assets/Approved.svg"
                      width={20}
                      height={20}
                      alt="approve"
                      onClick={() => handleApprove(appt._id)}
                    />
                  </div>

                  <div className="p-2 w-10 h-10 rounded-full flex align-middle justify-center bg-eerie-black hover:bg-input-bg hover:cursor-pointer">
                    <Image 
                      className="opacity-70"
                      src="assets/Cancelled.svg"
                      width={20}
                      height={20}
                      alt="cancel"
                      onClick={() => handleCancel(appt._id)}
                    />
                  </div>
                </>
              )}

              {appt.apptStatus === "Approved" && (
                <>
                  <div className="p-2 w-10 h-10 rounded-full flex align-middle justify-center bg-eerie-black hover:bg-input-bg hover:cursor-pointer">
                    <Image 
                      className="opacity-70"
                      src="assets/Cancelled.svg"
                      width={20}
                      height={20}
                      alt="cancel"
                      onClick={() => handleCancel(appt._id)}
                    />
                  </div>
                </>
              )}

              {appt.apptStatus === "Cancelled" && (
                <>
                  <div className="p-2 w-10 h-10 rounded-full flex align-middle justify-center bg-eerie-black hover:bg-input-bg hover:cursor-pointer">
                    <Image 
                      className="opacity-70"
                      src="assets/Approved.svg"
                      width={20}
                      height={20}
                      alt="approve"
                      onClick={() => handleApprove(appt._id)}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
