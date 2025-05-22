"use client";

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingSpinner from './LoadingSpinner';

export default function ApptForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    doctor: '',
    apptDate: '',
    reason: ''
  });

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    doctor_err: '',
    apptDate_err: '',
    reason_err: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOptionClick = (doctorName) => {
    setFormData({ ...formData, doctor: doctorName });
    setDropdownVisible(false);
  };

  // Client-side validation
  const validateForm = () => {
    let isValid = true;
    const errors = {
      doctor_err: '',
      apptDate_err: '',
      reason_err: ''
    };

    // Doctor validation
    if (!formData.doctor) {
      errors.doctor_err = 'Please select a doctor';
      isValid = false;
    }

    // Date validation
    if (!formData.apptDate) {
      errors.apptDate_err = 'Please select an appointment date and time';
      isValid = false;
    } else {
      const selectedDate = new Date(formData.apptDate);
      const now = new Date();

      if (selectedDate < now) {
        errors.apptDate_err = 'Appointment date cannot be in the past';
        isValid = false;
      }
    }

    // Reason validation
    if (!formData.reason.trim()) {
      errors.reason_err = 'Please provide a reason for the appointment';
      isValid = false;
    } else if (formData.reason.trim().length < 5) {
      errors.reason_err = 'Reason must be at least 5 characters long';
      isValid = false;
    }

    setErrorMessages(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform client-side validation first
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setGeneralError('');
    setSuccessMessage('');

    try {
      const newApptData = {
        userId: session?.user.id,
        creatorName: session?.user.name,
        doctor: formData.doctor,
        apptDate: formData.apptDate,
        reason: formData.reason,
      };

      const res = await fetch('/api/create_appt', {
        method: 'POST',
        body: JSON.stringify(newApptData),
        headers: { 'Content-Type': 'application/json' }
      });

      if(res.ok){
        setSuccessMessage('Appointment created successfully!');
        // Wait for 2 seconds to show success message before redirecting
        setTimeout(() => {
          router.push('/patient_dashboard');
        }, 2000);
      }
      else{
        const errors = await res.json();
        console.log(errors);

        setErrorMessages({
          doctor_err: errors.doctor,
          apptDate_err: errors.apptDate,
          reason_err: errors.reason
        });

        setGeneralError("Error creating new appointment. Please check the form and try again.");
        console.log("Error creating new appointment");
      }
    } catch (error) {
      setGeneralError("An error occurred while creating the appointment. Please try again.");
      console.error("Appointment creation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="appt_form" onSubmit={handleSubmit}>
      <label htmlFor="doctor">DOCTOR</label>
      <br />

      <div className="f_input flex align-middle justify-between" onClick={handleDropdownToggle}>
        <span className="opacity-70">{formData.doctor || "Select a doctor"}</span>
        <span className={`transition-transform ${dropdownVisible ? 'rotate-180' : 'rotate-0'}`}>
          <Image
            src="/assets/dropdown.svg"
            width={24}
            height={24}
            alt="dropdown"
            className="hover:cursor-pointer"
          />
        </span>
      </div>

      {errorMessages.doctor_err !== '' && (
        <>
          <div className="err">{errorMessages.doctor_err}</div>
        </>
      )}

      {dropdownVisible && (
        <div className="options bg-input-bg rounded-md mt-2">
          <div className="opt" onClick={() => handleOptionClick("Dr. Jane Auma | Oncology")}>Dr. Jane Auma | Oncology</div>
          <div className="opt" onClick={() => handleOptionClick("Dr. Simon Phraiser | E.N.T.")}>Dr. Simon Phraiser | E.N.T.</div>
          <div className="opt" onClick={() => handleOptionClick("Dr. John Wafula | Orthopedics")}>Dr. John Wafula | Orthopedics</div>
          <div className="opt" onClick={() => handleOptionClick("Dr. Irene Zuma | Cardiology")}>Dr. Irene Zuma | Cardiology</div>
          <div className="opt" onClick={() => handleOptionClick("Dr. Dana Fox | Pediatrics")}>Dr. Dana Fox | Pediatrics</div>
          <div className="opt" onClick={() => handleOptionClick("Dr. Amit Shah | Dermatology")}>Dr. Amit Shah | Dermatology</div>
          <div className="opt" onClick={() => handleOptionClick("Dr. Jimmy Chou | Gastroenterology")}>Dr. Jimmy Chou | Gastroenterology</div>
          <div className="opt" onClick={() => handleOptionClick("Dr. Alfred Stein | Endocrinology")}>Dr. Alfred Stein | Endocrinology</div>
          <div className="opt" onClick={() => handleOptionClick("Dr. Mark Mandela | Neurology")}>Dr. Mark Mandela | Neurology</div>
          <div className="opt" onClick={() => handleOptionClick("Dr. Jaqeline Mumbi | Gynecology")}>Dr. Jaqeline Mumbi | Gynecology</div>
        </div>
      )}
      <br />

      <div className="field">
        <label htmlFor="apptDate">DATE</label>
        <br />
        <input
          className="f_input"
          type="datetime-local"
          name="apptDate"
          id="apptDate"
          value={formData.apptDate}
          onChange={handleChange}
        />

        {errorMessages.apptDate_err !== '' && (
          <>
            <div className="err">{errorMessages.apptDate_err}</div>
          </>
        )}
      </div>

      <div className="field">
        <label htmlFor="reason">APPOINTMENT REASON</label>
        <br />
        <textarea className="f_input" name="reason" id="reason" placeholder="e.g. Annual/monthly/weekly checkup..." value={formData.reason} onChange={handleChange}></textarea>

        {errorMessages.reason_err !== '' && (
          <>
            <div className="err">{errorMessages.reason_err}</div>
          </>
        )}
      </div>

      {generalError && (
        <div className="w-full text-center mb-4">
          <span className="text-Cancelled-clr">{generalError}</span>
        </div>
      )}

      {successMessage && (
        <div className="w-full text-center mb-4">
          <span className="text-Approved-clr">{successMessage}</span>
        </div>
      )}

      <div className="flex justify-center align-middle mt-4">
        <button
          type="submit"
          className="btn btn_submit flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="small" text="" />
              <span className="ml-2">SUBMITTING...</span>
            </>
          ) : 'SUBMIT'}
        </button>
      </div>
    </form>
  )
}
