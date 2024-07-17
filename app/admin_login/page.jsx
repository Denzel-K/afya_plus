"use client"

import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      email: username,
      password: password,
      isAdmin: true // Indicating this is an admin login
    });

    if (result?.error) {
      console.error(result.error);
    } else {
      // Redirect to the admin dashboard or handle successful login
      router.push('/admin_dashboard');
    }
  }

  return (
    <section className="w-full sm:w-5/6 md:w-2/5 m-auto">
      <div className="py-4">
        <Link href="/" className="flex align-middle justify-between px-2 py-1 border-border border-2 w-1/6 rounded-md transition ease duration-200 hover:bg-input-bg">
          <span className="text-lg font-semibold text-primary-azure opacity-75">Back</span>
          <Image 
            src="assets/back.svg"
            width={26}
            height={26}
            alt="back"
            className="ml-2"
          />
        </Link>
      </div>

      <div className="md:px-16 py-8 px-6 rounded-lg bg-eerie-black">
        <div className="shield_box flex align-middle justify-center">
          <Image 
            src="assets/shield-keyhole.svg"
            width={50}
            height={50}
            alt="shield"
          />
        </div>
        <h3 className="text-primary-azure text-4xl opacity-75 text-center">Admin</h3>
        <br /><br />

        <form className="login_form" onSubmit={handleSubmit}>
          <label htmlFor="username">USERNAME</label>
          <br />
          <input 
            className="f_input"
            type="text" 
            name="username" 
            id="username" 
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

          <div className="flex justify-center align-middle mt-4">
            <button type="submit" className="btn btn_submit">
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
