"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import MyAppointments from '../../components/MyAppointments';
import LoadingSpinner from '../../components/LoadingSpinner';

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
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="large" text="Loading your dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Header */}
      <header className="bg-bg-card shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/afyaplus_logo.svg"
              width={36}
              height={36}
              alt="AfyaPlus Logo"
              className="mr-2"
            />
            <span className="text-lg font-bold">
              <span className="bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">Afya</span>
              <span className="text-text-primary">Plus</span>
            </span>
          </Link>

          <div className="flex items-center space-x-2 md:space-x-4">
            <Link
              href="/profile"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-gradient-start to-gradient-mid flex items-center justify-center"
              aria-label="My Profile"
            >
              <Image
                src="/assets/user-circle.svg"
                width={20}
                height={20}
                alt="User"
                className="text-white"
              />
            </Link>

            <div className="hidden md:flex items-center mr-2">
              <span className="text-text-primary font-medium">{session?.user?.name}</span>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center px-2 py-1.5 md:px-3 md:py-2 border border-accent-tertiary text-accent-tertiary rounded-lg hover:bg-accent-tertiary hover:bg-opacity-10 transition-all duration-300 text-sm"
              aria-label="Log Out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden md:inline">Log Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-gradient-start/10 to-gradient-end/10 rounded-xl p-4 md:p-5 mb-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/5 flex justify-center mb-4 md:mb-0">
            <Image
              src="/assets/medical-staff.svg"
              width={100}
              height={100}
              alt="Medical Staff"
              className="drop-shadow-lg w-24 h-24 md:w-28 md:h-28"
            />
          </div>
          <div className="md:w-4/5 md:pl-6 text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-bold text-text-primary mb-1">
              Welcome back, <span className="text-accent-primary">{session?.user?.name}</span>!
            </h1>
            <p className="text-text-secondary text-sm md:text-base mb-3 md:mb-4">
              Manage your healthcare appointments and medical information all in one place.
            </p>
            <Link
              href="/new_appt"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gradient-start to-gradient-mid text-white rounded-lg hover:from-gradient-start hover:to-gradient-end transition-all duration-300 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Appointment
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3 md:gap-0">
          <h2 className="text-xl font-bold text-text-primary flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            My Appointments
          </h2>
          <div className="w-full md:w-auto">
            <Link
              href="/new_appt"
              className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-gradient-to-r from-gradient-start to-gradient-mid text-white rounded-lg hover:from-gradient-start hover:to-gradient-end transition-all duration-300 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>New Appointment</span>
            </Link>
          </div>
        </div>

        <div className="bg-bg-card rounded-xl shadow-card overflow-hidden">
          <div className="p-6">
            <MyAppointments />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Patient_Dashboard;