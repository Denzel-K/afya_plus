"use client"

import {useState, useEffect} from "react";
import Image from 'next/image';
import LoadingSpinner from './LoadingSpinner';

export default function AllAppts() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [actionApptId, setActionApptId] = useState(null);

  async function fetchAllAppts(){
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/get_all_appts', {
        method: 'GET'
      });

      if(res.ok){
        const data = await res.json();
        setAppointments(data);
        applyFilter(activeFilter, data);
      }
      else {
        setError('Failed to fetch appointments. Please try again.');
        console.error('Failed to fetch appointments');
      }
    }
    catch (error) {
      setError('Error loading appointments. Please refresh the page.');
      console.error('Error fetching appointments:', error);
    }
    finally {
      setLoading(false);
    }
  }

  // Function to filter appointments based on status
  const applyFilter = (filter, appts = appointments) => {
    if (filter === 'All') {
      setFilteredAppointments(appts);
    } else {
      setFilteredAppointments(appts.filter(appt => appt.apptStatus === filter));
    }
  };

  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    applyFilter(filter);
  };

  useEffect(() => {
    fetchAllAppts();

    // Set up polling for real-time updates
    const intervalId = setInterval(() => {
      fetchAllAppts();
    }, 30000); // Poll every 30 seconds

    // Set up event listeners for filter buttons
    const filterButtons = document.querySelectorAll('#appointment-filters button');

    const handleFilterClick = (e) => {
      const filter = e.target.getAttribute('data-filter');
      if (filter) {
        // Update active button styling
        filterButtons.forEach(btn => {
          if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('bg-gradient-to-r', 'from-gradient-start', 'to-gradient-mid', 'text-white');
            btn.classList.remove('text-text-secondary', 'hover:bg-border', 'hover:bg-opacity-30');
          } else {
            btn.classList.remove('bg-gradient-to-r', 'from-gradient-start', 'to-gradient-mid', 'text-white');
            btn.classList.add('text-text-secondary', 'hover:bg-border', 'hover:bg-opacity-30');
          }
        });

        // Apply the filter
        handleFilterChange(filter);
      }
    };

    filterButtons.forEach(button => {
      button.addEventListener('click', handleFilterClick);
    });

    return () => {
      clearInterval(intervalId);
      // Clean up event listeners
      filterButtons.forEach(button => {
        button.removeEventListener('click', handleFilterClick);
      });
    };
  }, []);

  // Apply filter when activeFilter changes
  useEffect(() => {
    applyFilter(activeFilter);
  }, [activeFilter]);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  async function handleApprove(apptId){
    const hasConfirmed = confirm("Confirm appointment approval");

    if(hasConfirmed){
      setActionLoading(true);
      setActionApptId(apptId);
      setError('');

      try {
        const res = await fetch(`/api/getAppt/${apptId}`, {
          method: 'PATCH',
          body: JSON.stringify({newStatus: 'Approved'}),
          headers: { 'Content-Type': 'application/json' }
        });

        if(res.ok){
          setSuccessMessage('Appointment approved successfully!');
          fetchAllAppts();
        } else {
          setError('Failed to approve appointment. Please try again.');
        }
      } catch (error) {
        setError('Error approving appointment. Please try again.');
        console.error('Error approving appointment:', error);
      } finally {
        setActionLoading(false);
        setActionApptId(null);
      }
    }
  }

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

  function openCancelModal(apptId) {
    setAppointmentToCancel(apptId);
    setCancelReason('');
    setShowCancelModal(true);
  }

  function closeCancelModal() {
    setShowCancelModal(false);
    setAppointmentToCancel(null);
    setCancelReason('');
  }

  async function handleCancel(){
    if (!appointmentToCancel) return;

    setActionLoading(true);
    setActionApptId(appointmentToCancel);
    setError('');

    try {
      const res = await fetch(`/api/getAppt/${appointmentToCancel}`, {
        method: 'PATCH',
        body: JSON.stringify({
          newStatus: 'Cancelled',
          cancellationReason: cancelReason.trim() || 'No reason provided'
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      if(res.ok){
        setSuccessMessage('Appointment cancelled successfully!');
        fetchAllAppts();
        closeCancelModal();
      } else {
        setError('Failed to cancel appointment. Please try again.');
      }
    } catch (error) {
      setError('Error cancelling appointment. Please try again.');
      console.error('Error cancelling appointment:', error);
    } finally {
      setActionLoading(false);
      setActionApptId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <LoadingSpinner size="medium" text="Loading appointments..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-Cancelled-clr text-center py-4">
        {error}
        <button
          onClick={fetchAllAppts}
          className="ml-4 px-3 py-1 bg-input-bg rounded-md text-primary-azure hover:bg-eerie-black"
        >
          Retry
        </button>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <Image
          src="/assets/folder-empty.svg"
          width={36}
          height={36}
          alt="empty appts"
        />
        <span className="text-lg text-text-secondary mt-2">No appointments yet</span>
      </div>
    );
  }

  // Show message when filter returns no results
  if (filteredAppointments.length === 0 && appointments.length > 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="bg-bg-dark rounded-lg p-4 text-center max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-text-secondary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-text-secondary mb-2">No {activeFilter} appointments found</p>
          <button
            onClick={() => handleFilterChange('All')}
            className="text-accent-primary hover:text-accent-secondary transition-colors"
          >
            View all appointments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="all_appointments mt-4 w-full a_appt_cont scrollable">
      {/* Cancellation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-bg-card rounded-xl shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={closeCancelModal}
              className="absolute top-4 right-4 text-text-secondary hover:text-text-primary"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-bold text-text-primary mb-4">Cancel Appointment</h3>
            <p className="text-text-secondary mb-4">Please provide a reason for cancelling this appointment:</p>

            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full bg-input-bg border-border border rounded-lg px-4 py-3 text-base text-text-primary mb-4 min-h-[100px]"
              placeholder="Enter cancellation reason..."
              aria-label="Cancellation reason"
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={closeCancelModal}
                className="px-4 py-2 border border-border text-text-secondary rounded-lg hover:bg-border hover:bg-opacity-20 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-accent-tertiary text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 flex items-center"
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <>
                    <LoadingSpinner size="small" text="" />
                    <span className="ml-2">Processing...</span>
                  </>
                ) : 'Confirm Cancellation'}
              </button>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="bg-bg-card p-4 mb-4 rounded-lg text-center border-l-4 border-Approved-clr shadow-md">
          <span className="text-Approved-clr font-medium">{successMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredAppointments.map((appt) => (
          <div key={appt._id} className="bg-bg-dark rounded-lg shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300 border border-border">
            {/* Card Header with Patient Info and Status */}
            <div className="flex items-center justify-between p-3 border-b border-border bg-bg-card">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gradient-start/20 to-gradient-mid/20 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary truncate max-w-[120px]">{appt.createdBy}</h3>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full bg-${appt.apptStatus}-clr mr-1`}></div>
                    <p className="text-xs text-text-secondary">{appt.apptStatus}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                {appt.apptStatus === "Pending" && (
                  <div className="flex space-x-1">
                    <button
                      onClick={() => !actionLoading && handleApprove(appt._id)}
                      disabled={actionLoading && actionApptId === appt._id}
                      className="w-7 h-7 rounded-full bg-Approved-clr bg-opacity-20 flex items-center justify-center text-Approved-clr hover:bg-opacity-30 transition-all"
                      aria-label="Approve appointment"
                    >
                      {actionLoading && actionApptId === appt._id ? (
                        <LoadingSpinner size="small" text="" />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>

                    <button
                      onClick={() => !actionLoading && openCancelModal(appt._id)}
                      disabled={actionLoading && actionApptId === appt._id}
                      className="w-7 h-7 rounded-full bg-Cancelled-clr bg-opacity-20 flex items-center justify-center text-Cancelled-clr hover:bg-opacity-30 transition-all"
                      aria-label="Cancel appointment"
                    >
                      {actionLoading && actionApptId === appt._id ? (
                        <LoadingSpinner size="small" text="" />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </button>
                  </div>
                )}

                {appt.apptStatus === "Approved" && (
                  <button
                    onClick={() => !actionLoading && openCancelModal(appt._id)}
                    disabled={actionLoading && actionApptId === appt._id}
                    className="w-7 h-7 rounded-full bg-Cancelled-clr bg-opacity-20 flex items-center justify-center text-Cancelled-clr hover:bg-opacity-30 transition-all"
                    aria-label="Cancel appointment"
                  >
                    {actionLoading && actionApptId === appt._id ? (
                      <LoadingSpinner size="small" text="" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </button>
                )}

                {appt.apptStatus === "Cancelled" && (
                  <button
                    onClick={() => !actionLoading && handleApprove(appt._id)}
                    disabled={actionLoading && actionApptId === appt._id}
                    className="w-7 h-7 rounded-full bg-Approved-clr bg-opacity-20 flex items-center justify-center text-Approved-clr hover:bg-opacity-30 transition-all"
                    aria-label="Approve appointment"
                  >
                    {actionLoading && actionApptId === appt._id ? (
                      <LoadingSpinner size="small" text="" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-3">
              {/* Doctor and Reason */}
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <h4 className="text-xs font-medium text-text-secondary mb-1">Doctor</h4>
                  <p className="text-sm text-text-primary truncate">{appt.doctor}</p>
                </div>

                <div>
                  <h4 className="text-xs font-medium text-text-secondary mb-1">Reason</h4>
                  <p className="text-sm text-text-primary line-clamp-1">{appt.reason}</p>
                </div>
              </div>

              {/* Date Information */}
              <div className="grid grid-cols-1 gap-2 mb-2">
                <div className="bg-bg-card rounded-md p-2 flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent-primary mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <span className="text-xs font-medium text-text-secondary block">Appointment</span>
                    <p className="text-xs text-text-primary">{new Date(appt.apptDate).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Cancellation Reason */}
              {appt.apptStatus === "Cancelled" && appt.cancellationReason && (
                <div className="mt-2 bg-Cancelled-clr bg-opacity-10 p-2 rounded-md border-l-2 border-Cancelled-clr">
                  <h4 className="text-xs font-semibold text-Cancelled-clr mb-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Cancellation Reason
                  </h4>
                  <p className="text-xs text-Cancelled-clr ml-4 line-clamp-2">{appt.cancellationReason}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
