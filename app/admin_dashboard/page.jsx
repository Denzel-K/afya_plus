"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import AllAppts from "../../components/AllAppts";
import ApptStats from '../../components/ApptStats';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin_login');
    } 
    else if (status === 'authenticated' && session?.user?.role !== 'admin') {
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
        <span className="page_head">ADMINISTRATOR</span>
        <span>
          <button className="logout" onClick={() => signOut({ callbackUrl: '/' })}>
            Log Out
          </button>
        </span>
      </div>
      <div className="dash_grid w-full">
        <div className="main_box mt-4 md:mt-0 w-full">
          <div className="appt_container a_appt_cont">
            <div className="appt_head">
              <span>Appointments</span>
            </div>

            <AllAppts />     
          </div>
        </div>

        <div className="profile_details appt_stats">
          <div className="appt_head mt-2">
            <span>Appointment Stats</span>
            <span>
              <Image 
                src="assets/stats.svg"
                width={40}
                height={40}
                alt="stats"
              />
            </span>
          </div>

          <ApptStats />
        </div>
      </div>
    </section>
  )
}

export default AdminDashboard;