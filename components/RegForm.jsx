"use client"

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';
import LoadingSpinner from './LoadingSpinner';

export default function RegForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    confirm_password: '',
    insurance_provider: '',
    insurance_number: '',
    allergies: '',
    current_meds: '',
    family_med_history: '',
  });
  const [errorMessages, setErrorMessages] = useState({
    name_err: '',
    birthDate_err: '',
    email_err: '',
    gender_err: '',
    phone_err: '',
    password_err: '',
    password_confirm_err: '',
    insurance_provider_err: '',
    insurance_number_err: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Client-side validation
  const validateForm = () => {
    let isValid = true;
    const errors = {
      name_err: '',
      birthDate_err: '',
      email_err: '',
      gender_err: '',
      phone_err: '',
      password_err: '',
      password_confirm_err: '',
      insurance_provider_err: '',
      insurance_number_err: ''
    };

    // Name validation
    if (!formData.name.trim()) {
      errors.name_err = 'Name is required';
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      errors.name_err = 'Name should only contain letters and spaces';
      isValid = false;
    }

    // Birth date validation
    if (!formData.birthDate) {
      errors.birthDate_err = 'Birth date is required';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email_err = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email_err = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone validation
    if (!formData.phone.trim()) {
      errors.phone_err = 'Phone number is required';
      isValid = false;
    } else if (!/^(\+254[17]\d{8}|0[17]\d{8})$/.test(formData.phone)) {
      errors.phone_err = 'Please enter a valid phone number format';
      isValid = false;
    }

    // Gender validation
    if (!formData.gender) {
      errors.gender_err = 'Please select a gender';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      errors.password_err = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password_err = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Password confirmation
    if (formData.password !== formData.confirm_password) {
      errors.password_confirm_err = 'Passwords do not match';
      isValid = false;
    }

    // Insurance provider validation
    if (!formData.insurance_provider.trim()) {
      errors.insurance_provider_err = 'Insurance provider is required';
      isValid = false;
    }

    // Insurance number validation
    if (!formData.insurance_number.trim()) {
      errors.insurance_number_err = 'Insurance number is required';
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

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {'Content-Type': 'application/json'}
      });

      if (res.ok){
        try {
          const result = await signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password
          });

          if (result.ok) {
            router.push('/patient_dashboard');
          } else {
            setGeneralError("Registration successful but login failed. Please try logging in manually.");
            console.log("Signin failed:", result.error);
          }
        } catch (signInError) {
          setGeneralError("Registration successful but login failed. Please try logging in manually.");
          console.error("Sign-in error:", signInError);
        }
      }
      else{
        const errors = await res.json();

        setErrorMessages({
          name_err: errors.personal_details.name,
          birthDate_err: errors.personal_details.birthDate,
          email_err: errors.personal_details.email,
          gender_err: errors.personal_details.gender,
          phone_err: errors.personal_details.phone,
          password_err: errors.personal_details.password,
          insurance_provider_err: errors.medical_information.insurance_provider,
          insurance_number_err: errors.medical_information.insurance_number
        });
      }
    } catch (error) {
      setGeneralError("An error occurred during registration. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="reg_form" onSubmit={handleSubmit}>
      <div className="details_container">
        <div className="details p_details">
          <h3 className="text-blue text-base lg:text-center font-semibold">PERSONAL DETAILS</h3>
          <br />

          <div className="field">
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
            />
            {errorMessages.name_err !== '' && (
              <>
                <div className="err">{errorMessages.name_err}</div>
              </>
            )}
          </div>

          <div className="field">
            <label htmlFor="birthDate">BIRTH DATE</label>
            <br />
            <input
              className="f_input"
              type="date"
              name="birthDate"
              id="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
            {errorMessages.birthDate_err !== '' && (
              <>
                <div className="err">{errorMessages.birthDate_err}</div>
              </>
            )}
          </div>

          <div className="field">
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
            />
            {errorMessages.email_err !== '' && (
              <>
                <div className="err">{errorMessages.email_err}</div>
              </>
            )}
          </div>

          <div className="field">
            <label htmlFor="phone">PHONE NUMBER</label>
            <br />
            <input
              className="f_input"
              type="text"
              name="phone"
              id="phone"
              placeholder="e.g. +254712345678 or 0712345678"
              value={formData.phone}
              onChange={handleChange}
              aria-describedby="phoneHint"
            />
            <div id="phoneHint" className="text-xs text-primary-azure opacity-50 mt-1">
              Accepted formats: +254712345678, 0712345678
            </div>
            {errorMessages.phone_err !== '' && (
              <>
                <div className="err">{errorMessages.phone_err}</div>
              </>
            )}
          </div>

          <div className="field">
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
            {errorMessages.gender_err !== '' && (
              <>
                <div className="err">{errorMessages.gender_err}</div>
              </>
            )}
          </div>

          <div className="field">
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
            />
            {errorMessages.password_err !== '' && (
              <>
                <div className="err">{errorMessages.password_err}</div>
              </>
            )}
          </div>

          <div className="field no_margin">
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
              aria-describedby="passwordConfirmHint"
            />
            <div id="passwordConfirmHint" className="text-xs text-primary-azure opacity-50 mt-1">
              Re-enter your password to confirm
            </div>
            {errorMessages.password_confirm_err !== '' && (
              <>
                <div className="err">{errorMessages.password_confirm_err}</div>
              </>
            )}
          </div>
        </div>

        <div className="details m_details">
          <h3 className="text-blue text-base lg:text-center font-semibold">MEDICAL INFORMATION</h3>
          <br />

          <div className="field">
            <label htmlFor="insurance_provider">INSURANCE PROVIDER</label>
            <br />
            <input
              className="f_input"
              type="text"
              name="insurance_provider"
              id="insurance_provider"
              placeholder="e.g. NHIF, Humana, UnitedHealthcare"
              value={formData.insurance_provider}
              onChange={handleChange}
            />
            {errorMessages.insurance_provider_err !== '' && (
              <>
                <div className="err">{errorMessages.insurance_provider_err}</div>
              </>
            )}
          </div>

          <div className="field">
            <label htmlFor="insurance_number">INSURANCE POLICY NUMBER</label>
            <br />
            <input
              className="f_input"
              type="text"
              name="insurance_number"
              id="insurance_number"
              placeholder="e.g.INS823093"
              value={formData.insurance_number}
              onChange={handleChange}
            />
            {errorMessages.insurance_number_err !== '' && (
              <>
                <div className="err">{errorMessages.insurance_number_err}</div>
              </>
            )}
          </div>

          <div className="field">
            <label htmlFor="allergies">ALLERGIES - IF ANY</label>
            <br />
            <textarea className="f_input" name="allergies" id="allergies" placeholder="e.g. Penicillin allergy" value={formData.allergies} onChange={handleChange}></textarea>
          </div>

          <div className="field">
            <label htmlFor="current_meds">CURRENT MEDICATION - IF ANY</label>
            <br />
            <textarea className="f_input" name="current_meds" id="current_meds" placeholder="e.g. Ibuprofen, Azithromycin, Fluoxetine (Prozac)" value={formData.current_meds} onChange={handleChange}></textarea>
          </div>

          <div className="field">
            <label htmlFor="family_med_history">FAMILY MED HISTORY - IF APPLICABLE</label>
            <br />
            <textarea className="f_input" name="family_med_history" id="family_med_history" placeholder="e.g. Father had/has pancreatic cancer" value={formData.family_med_history} onChange={handleChange}></textarea>
          </div>
        </div>
      </div>

      {generalError && (
        <div className="w-full text-center mb-4">
          <span className="text-Cancelled-clr">{generalError}</span>
        </div>
      )}

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
    </form>
  )
}
