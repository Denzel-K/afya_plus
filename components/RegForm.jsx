"use client"

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';

export default function RegForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    insurance_provider: '',
    insurance_number: '',
    allergies: '',
    current_meds: '',
    family_med_history: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {'Content-Type': 'application/json'}
    });

    if (res.ok){
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
        isAdmin: false
      });

      if (result.ok) {
        router.push('/patient_dashboard');
      } else {
        console.log("Signin failed:", result.error);
      }
    }
    else {
      console.log("Signup failed");
    }
  };

  return (
    <form className="reg_form" onSubmit={handleSubmit}>
      <div className="details_container">
        <div className="details p_details">
          <h3 className="text-blue text-base lg:text-center font-semibold">PERSONAL DETAILS</h3>
          <br />
          <label htmlFor="name">FULL NAME</label>
          <br />
          <input 
            className="f_input"
            type="text" 
            name="name" 
            id="name" 
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <br /><br />
          <label htmlFor="birthDate">BIRTH DATE</label>
          <br />
          <input 
            className="f_input"
            type="date" 
            name="birthDate" 
            id="birthDate" 
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
          <br /><br />
          <label htmlFor="email">EMAIL</label>
          <br />
          <input 
            className="f_input"
            type="email" 
            name="email" 
            id="email" 
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br /><br />
          <label htmlFor="phone">PHONE NUMBER</label>
          <br />
          <input 
            className="f_input"
            type="text" 
            name="phone" 
            id="phone" 
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <br /><br />

          <label>GENDER</label>
          <div className="gender_box">
            <div className="g_field">
              <input type="radio" name="gender" id="male" value="male" checked={formData.gender === "male"} onChange={handleChange}/>
              <span className="g_type">Male</span>
            </div>

            <div className="g_field">
              <input type="radio" name="gender" id="female" value="female" checked={formData.gender === "female"} onChange={handleChange}/>
              <span className="g_type">Female</span>
            </div>

            <div className="g_field">
              <input type="radio" name="gender" id="other" value="other" checked={formData.gender === "other"} onChange={handleChange}/>
              <span className="g_type">Other</span>
            </div>
          </div>
          <br />

          <label htmlFor="password">PASWORD</label>
          <br />
          <input 
            type="password" 
            name="password" 
            id="password" 
            placeholder="Create a password"
            className="f_input"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <br /><br />

          <label htmlFor="confirm_password">CONFIRM PASSWORD</label>
          <br />
          <input 
            type="password" 
            name="confirm_password" 
            id="confirm_password" 
            placeholder="Confirm password"
            className="f_input"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="details m_details">
          <h3 className="text-blue text-base lg:text-center font-semibold">MEDICAL INFORMATION</h3>
          <br />
          <label htmlFor="insurance_provider">INSURANCE PROVIDER</label>
          <br />
          <input 
            className="f_input"
            type="text" 
            name="insurance_provider" 
            id="insurance_provider" 
            placeholder="NHIF"
            value={formData.insurance_provider}
            onChange={handleChange}
            required
          />
          <br /><br />

          <label htmlFor="insurance_number">INSURANCE POLICY NUMBER</label>
          <br />
          <input 
            className="f_input"
            type="text" 
            name="insurance_number" 
            id="insurance_number" 
            placeholder="INS823093"
            value={formData.insurance_number}
            onChange={handleChange}
            required
          />
          <br /><br />

          <label htmlFor="allergies">ALLERGIES - IF ANY</label>
          <br />
          <textarea className="f_input" name="allergies" id="allergies" placeholder="e.g. Penicillin allergy" value={formData.allergies} onChange={handleChange}></textarea>        
          <br /><br />

          <label htmlFor="current_meds">CURRENT MEDICATION - IF ANY</label>
          <br />
          <textarea className="f_input" name="current_meds" id="current_meds" placeholder="e.g. Ibuprofen, Azithromycin, Fluoxetine (Prozac)" value={formData.current_meds} onChange={handleChange}></textarea> 
          <br /><br />

          <label htmlFor="family_med_history">FAMILY MEDICAL HISTORY</label>
          <br />
          <textarea className="f_input" name="family_med_history" id="family_med_history" placeholder="e.g. Father had/has pancreatic cancer" value={formData.family_med_history} onChange={handleChange}></textarea> 
          <br /><br />
        </div>
      </div>

      <button type="submit" className="btn btn_submit">
        SUBMIT
      </button>
    </form>
  )
}
