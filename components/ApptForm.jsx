"use client";

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ApptForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    doctor: '',
    apptDate: '',
    reason: ''
  });

  const [dropdownVisible, setDropdownVisible] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newApptData = {
      userId: session?.user.id,
      creatorName: session?.user.id,
      doctor: formData.doctor,
      apptDate: formData.apptDate,
      reason: formData.reason,
    };
  
    //setApptData(newApptData);

    console.log(formData);
    console.log(newApptData);

    const res = await fetch('/api/create_appt', {
      method: 'POST',
      body: JSON.stringify(newApptData),
      headers: { 'Content-Type': 'application/json' }
    })

    if(res.ok){
      router.push('/patient_dashboard');
    }
    else{
      console.log("Error creating new appointment");
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
      <br /><br />

      <label htmlFor="reason">APPOINTMENT REASON</label>
      <br />
      <textarea className="f_input" name="reason" id="reason" placeholder="e.g. Annual/monthly/weekly checkup..." value={formData.reason} onChange={handleChange}></textarea>        
      <br /><br />

      <div className="flex justify-center align-middle mt-4">
        <button type="submit" className="btn btn_submit">
          SUBMIT
        </button>
      </div>
    </form>
  )
}
