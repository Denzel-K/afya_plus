"use client"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: username,
        password: password,
        isAdmin: true
      });

      if (result?.error || !result.ok) {
        setError('Invalid credentials. Please try again.');
        console.log("Error logging in:", result.error);
      }
      else {
        router.push('/admin_dashboard');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-12 bg-bg-dark">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="flex items-center justify-center">
              <Image
                src="/assets/afyaplus_logo.svg"
                width={60}
                height={60}
                alt="AfyaPlus Logo"
                className="mb-4"
              />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-admin-blue to-accent-secondary bg-clip-text text-transparent">
              Administrator Access
            </h1>
          </Link>
          <p className="text-text-secondary mt-2">Sign in to access the admin dashboard</p>
        </div>

        <div className="bg-bg-card rounded-xl shadow-card p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-admin-blue to-accent-secondary p-1">
              <div className="w-full h-full rounded-full bg-bg-card flex items-center justify-center">
                <Image
                  src="/assets/shield-keyhole.svg"
                  width={32}
                  height={32}
                  alt="Admin Shield"
                  className="text-white"
                />
              </div>
            </div>
          </div>

          <p className="text-text-secondary text-center text-sm mb-6">
            Use 'admin' and 'test1234' as username and password respectively
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-text-primary text-sm font-medium mb-2">Username</label>
              <input
                className="w-full bg-input-bg border-border border rounded-lg px-4 py-3 text-base text-text-primary"
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-text-primary text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full bg-input-bg border-border border rounded-lg px-4 py-3 text-base text-text-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-Cancelled-clr bg-opacity-10 border-l-4 border-Cancelled-clr rounded-md">
                <p className="text-Cancelled-clr text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-admin-blue to-accent-secondary text-white rounded-lg hover:from-admin-blue hover:to-accent-primary transition-all duration-300 shadow-button hover:shadow-button-hover"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="small" text="" />
                  <span className="ml-2">Signing in...</span>
                </>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-border pt-6">
            <Link
              href="/"
              className="text-text-secondary hover:text-text-primary transition-colors duration-300 text-sm flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
