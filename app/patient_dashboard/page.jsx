"use client";

import Image from 'next/image';
import Link from 'next/link';

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';

import MyAppointments from '../../components/MyAppointments';


function Patient_Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } 
    else if (status === 'authenticated' && session?.user?.role !== 'patient') {
      router.push('/unauthorized');
    }
  }, [status, router, session]);

  if (status === 'loading') {
    return (
      <div className="loading text-primary-azure text-center text-2xl">Loading...</div>
    );
  }

  return (
    <section className="p_dashboard md:px-8">
      <div className="page_type">
        <span className="page_head">DASHBOARD</span>
        <span>
          <button className="logout" onClick={() => signOut({ callbackUrl: '/' })}>
            Log Out
          </button>
        </span>
      </div>
      <div className="dash_grid">
        <div className="main_box w-full">
          <div className="welcome">
            <div>
              <Image 
                src="assets/medical-staff.svg"
                width={140}
                height={140}
                alt="med staff"
              />
            </div>
            <div>
              <h1>Hi there,</h1>
              <p>Welcome to Afya Plus, the number one healthcare management system</p>
            </div>
          </div>

          <div className="appt_container mt-4">
            <div className="appt_head">
              <span>My Appointments</span>
              <span>
                <Link href="/new_appt" className="btn new_appt_btn" type="button">
                  <span>CREATE</span>
                  <span>
                    <Image 
                      width={18}
                      height={18}
                      src="assets/calendar-add-appt.svg"
                      alt="add appt"
                    />
                  </span>
                </Link>
              </span>
            </div>

            <MyAppointments />        
          </div>
        </div>

        <div className="profile_details">
          <div className="w-full flex-col align-middle justify-center">
            <div className="person_img flex align-middle justify-center">
              <Image 
                src="/assets/user-circle.svg"
                width={80}
                height={80}
                alt="User"
              />
            </div>

            <div className="patient_name font-semibold text-primary-azure opacity-70 mt-2 text-center text-lg">{session?.user?.name}</div>
            <div className="patient_gender text-primary-azure opacity-50 text-center text-sm font-semibold">{session?.user?.gender}</div>
            <br />
            <div className="patient_email text-primary-azure text-center text-base font-semibold">
              <span className="opacity-70">Email:</span>
              <span className="opacity-50 ml-2">{session?.user?.email}</span>
            </div>
            <div className="patient_phone text-primary-azure text-center text-base font-semibold">
              <span className="opacity-70">Contact:</span>
              <span className="opacity-50 ml-2">{session?.user?.phone}</span>
            </div>
          </div>
          <div className="profile_bg rounded-md">
            <Image 
              src="/assets/bg.jpg"
              width={600}
              height={600}
              alt="bg"
              className="w-full h-full rounded-md"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Patient_Dashboard;