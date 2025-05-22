"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AllAppts from "../../components/AllAppts";
import ApptStats from '../../components/ApptStats';
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import LoadingSpinner from '../../components/LoadingSpinner';

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
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="large" text="Loading admin dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Header */}
      <header className="bg-bg-card shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/afyaplus_logo.svg"
              width={40}
              height={40}
              alt="AfyaPlus Logo"
              className="mr-3"
            />
            <span className="text-xl font-bold">
              <span className="bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">Afya</span>
              <span className="text-text-primary">Plus</span>
            </span>
          </Link>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="flex items-center mr-2">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-admin-blue to-accent-secondary flex items-center justify-center mr-2">
                <Image
                  src="/assets/shield-user.svg"
                  width={20}
                  height={20}
                  alt="Admin"
                  className="text-white"
                />
              </div>
              <span className="hidden md:inline text-text-primary font-medium text-sm">Administrator</span>
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
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-admin-blue/10 to-accent-secondary/10 rounded-xl p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-lg md:text-2xl font-bold text-text-primary mb-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-admin-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Administrator Dashboard
              </h1>
              <p className="text-sm md:text-lg text-text-secondary">
                Manage all patient appointments and healthcare services.
              </p>
            </div>
            <div className="bg-bg-dark p-3 rounded-lg shadow-sm flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="text-sm md:text-lg font-bold text-text-primary/70">
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-6">
          <div className="bg-bg-card rounded-xl shadow-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h2 className="text-lg font-bold text-text-primary flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Appointment Statistics
              </h2>
            </div>
            <div className="p-4">
              <ApptStats />
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="bg-bg-card rounded-xl shadow-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <h2 className="text-lg font-bold text-text-primary flex items-center mb-3 md:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Appointments
              </h2>

              {/* Filter Tabs - These will be handled by the AllAppts component */}
              <div id="appointment-filters" className="flex flex-wrap space-x-1 bg-bg-dark rounded-lg p-1">
                <button
                  id="filter-all"
                  className="px-3 py-1.5 text-sm font-medium rounded-md bg-gradient-to-r from-gradient-start to-gradient-mid text-white"
                  data-filter="All"
                >
                  All
                </button>
                <button
                  id="filter-pending"
                  className="px-3 py-1.5 text-sm font-medium rounded-md text-text-secondary hover:bg-border hover:bg-opacity-30 transition-colors"
                  data-filter="Pending"
                >
                  Pending
                </button>
                <button
                  id="filter-approved"
                  className="px-3 py-1.5 text-sm font-medium rounded-md text-text-secondary hover:bg-border hover:bg-opacity-30 transition-colors"
                  data-filter="Approved"
                >
                  Approved
                </button>
                <button
                  id="filter-cancelled"
                  className="px-3 py-1.5 text-sm font-medium rounded-md text-text-secondary hover:bg-border hover:bg-opacity-30 transition-colors"
                  data-filter="Cancelled"
                >
                  Cancelled
                </button>
              </div>
            </div>
          </div>

          <div className="p-4">
            <AllAppts />
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard;