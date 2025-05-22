"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import LoadingSpinner from '../../components/LoadingSpinner';

function PatientProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    birthDate: '',
    insurance_provider: '',
    insurance_number: '',
    allergies: '',
    current_meds: '',
    family_med_history: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } 
    else if (status === 'authenticated' && session?.user?.role !== 'patient') {
      router.push('/unauthorized');
    }
    else if (status === 'authenticated' && session?.user) {
      // Populate form with user data
      setProfileData({
        name: session.user.name || '',
        email: session.user.email || '',
        phone: session.user.phone || '',
        gender: session.user.gender || '',
        birthDate: session.user.birthDate || '',
        insurance_provider: session.user.insurance_provider || '',
        insurance_number: session.user.insurance_number || '',
        allergies: session.user.allergies || '',
        current_meds: session.user.current_meds || '',
        family_med_history: session.user.family_med_history || '',
      });
    }
  }, [status, router, session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // This would be replaced with an actual API call to update the user profile
      // const res = await fetch('/api/update-profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(profileData)
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // if (res.ok) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setIsEditing(false);
      // } else {
      //   setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
      // }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="large" text="Loading your profile..." />
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
          
          <div className="flex items-center space-x-4">
            <Link
              href="/patient_dashboard"
              className="flex items-center px-4 py-2 border border-accent-primary text-accent-primary rounded-lg hover:bg-accent-primary hover:bg-opacity-10 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>
            
            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center px-4 py-2 border border-accent-tertiary text-accent-tertiary rounded-lg hover:bg-accent-tertiary hover:bg-opacity-10 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log Out
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              My Profile
            </h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-gradient-start to-gradient-mid text-white rounded-lg hover:from-gradient-start hover:to-gradient-end transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {message.text && (
            <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-Approved-clr bg-opacity-10 text-Approved-clr' : 'bg-Cancelled-clr bg-opacity-10 text-Cancelled-clr'}`}>
              {message.text}
            </div>
          )}

          <div className="bg-bg-card rounded-xl shadow-card overflow-hidden">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-text-secondary mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleChange}
                      className="w-full bg-input-bg border-border border rounded-lg px-4 py-3 text-base text-text-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-text-secondary mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                      className="w-full bg-input-bg border-border border rounded-lg px-4 py-3 text-base text-text-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-text-secondary mb-2">Phone Number</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      className="w-full bg-input-bg border-border border rounded-lg px-4 py-3 text-base text-text-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="gender" className="block text-text-secondary mb-2">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      value={profileData.gender}
                      onChange={handleChange}
                      className="w-full bg-input-bg border-border border rounded-lg px-4 py-3 text-base text-text-primary"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="birthDate" className="block text-text-secondary mb-2">Date of Birth</label>
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      value={profileData.birthDate}
                      onChange={handleChange}
                      className="w-full bg-input-bg border-border border rounded-lg px-4 py-3 text-base text-text-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="insurance_provider" className="block text-text-secondary mb-2">Insurance Provider</label>
                    <input
                      type="text"
                      id="insurance_provider"
                      name="insurance_provider"
                      value={profileData.insurance_provider}
                      onChange={handleChange}
                      className="w-full bg-input-bg border-border border rounded-lg px-4 py-3 text-base text-text-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="insurance_number" className="block text-text-secondary mb-2">Insurance Number</label>
                    <input
                      type="text"
                      id="insurance_number"
                      name="insurance_number"
                      value={profileData.insurance_number}
                      onChange={handleChange}
                      className="w-full bg-input-bg border-border border rounded-lg px-4 py-3 text-base text-text-primary"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label htmlFor="allergies" className="block text-text-secondary mb-2">Allergies</label>
                  <textarea
                    id="allergies"
                    name="allergies"
                    value={profileData.allergies}
                    onChange={handleChange}
                    className="w-full bg-input-bg border-border border rounded-lg px-4 py-3 text-base text-text-primary min-h-[100px]"
                  ></textarea>
                </div>
                
                <div className="mt-6">
                  <label htmlFor="current_meds" className="block text-text-secondary mb-2">Current Medications</label>
                  <textarea
                    id="current_meds"
                    name="current_meds"
                    value={profileData.current_meds}
                    onChange={handleChange}
                    className="w-full bg-input-bg border-border border rounded-lg px-4 py-3 text-base text-text-primary min-h-[100px]"
                  ></textarea>
                </div>
                
                <div className="mt-6">
                  <label htmlFor="family_med_history" className="block text-text-secondary mb-2">Family Medical History</label>
                  <textarea
                    id="family_med_history"
                    name="family_med_history"
                    value={profileData.family_med_history}
                    onChange={handleChange}
                    className="w-full bg-input-bg border-border border rounded-lg px-4 py-3 text-base text-text-primary min-h-[100px]"
                  ></textarea>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-gradient-start to-gradient-mid text-white rounded-lg hover:from-gradient-start hover:to-gradient-end transition-all duration-300 flex items-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <LoadingSpinner size="small" text="" />
                        <span className="ml-2">Saving...</span>
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-gradient-start to-gradient-mid p-1 mb-4">
                      <div className="w-full h-full rounded-full bg-bg-card flex items-center justify-center">
                        <Image
                          src="/assets/user-circle.svg"
                          width={80}
                          height={80}
                          alt="User"
                          className="text-white"
                        />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-text-primary">{profileData.name}</h2>
                    <p className="text-text-secondary">{profileData.gender}</p>
                  </div>
                  
                  <div className="md:w-2/3 md:pl-8">
                    <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Personal Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-bg-dark rounded-lg p-4">
                        <p className="text-sm text-text-secondary mb-1">Email</p>
                        <p className="text-text-primary">{profileData.email}</p>
                      </div>
                      
                      <div className="bg-bg-dark rounded-lg p-4">
                        <p className="text-sm text-text-secondary mb-1">Phone</p>
                        <p className="text-text-primary">{profileData.phone}</p>
                      </div>
                      
                      <div className="bg-bg-dark rounded-lg p-4">
                        <p className="text-sm text-text-secondary mb-1">Date of Birth</p>
                        <p className="text-text-primary">{profileData.birthDate}</p>
                      </div>
                      
                      <div className="bg-bg-dark rounded-lg p-4">
                        <p className="text-sm text-text-secondary mb-1">Gender</p>
                        <p className="text-text-primary">{profileData.gender}</p>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Insurance Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-bg-dark rounded-lg p-4">
                        <p className="text-sm text-text-secondary mb-1">Insurance Provider</p>
                        <p className="text-text-primary">{profileData.insurance_provider}</p>
                      </div>
                      
                      <div className="bg-bg-dark rounded-lg p-4">
                        <p className="text-sm text-text-secondary mb-1">Insurance Number</p>
                        <p className="text-text-primary">{profileData.insurance_number}</p>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Medical Information
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="bg-bg-dark rounded-lg p-4">
                        <p className="text-sm text-text-secondary mb-1">Allergies</p>
                        <p className="text-text-primary">{profileData.allergies || 'None'}</p>
                      </div>
                      
                      <div className="bg-bg-dark rounded-lg p-4">
                        <p className="text-sm text-text-secondary mb-1">Current Medications</p>
                        <p className="text-text-primary">{profileData.current_meds || 'None'}</p>
                      </div>
                      
                      <div className="bg-bg-dark rounded-lg p-4">
                        <p className="text-sm text-text-secondary mb-1">Family Medical History</p>
                        <p className="text-text-primary">{profileData.family_med_history || 'None'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default PatientProfile;
