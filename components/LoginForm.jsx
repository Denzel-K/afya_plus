"use client"

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password
    });

    if (result?.error || !result.ok) {
      setError('Invalid credentials. Please try again.');
      console.error(result.error);
    } 
    else {
      setError('');
      router.push('/patient_dashboard');
    }
  }

  return (
    <form className="login_form" onSubmit={handleSubmit}>
      <label htmlFor="email">EMAIL</label>
      <br />
      <input 
        className="f_input"
        type="email" 
        name="email" 
        id="email" 
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <label htmlFor="password">PASWORD</label>
      <br />
      <input 
        type="password" 
        name="password" 
        id="password" 
        placeholder="Enter your password"
        className="f_input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />  

      <div className="mt-2 text-center">
        {error && <span className="text-Cancelled-clr">{error}</span>}
      </div>

      <div className="flex justify-center align-middle mt-4">
        <button type="submit" className="btn btn_submit">
          LOGIN
        </button>
      </div>
    </form>
  )
}
