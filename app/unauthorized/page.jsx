import Image from 'next/image';
import Link from 'next/link';

export default function Unauthorized() {
  return (
    <section className="w-full flex flex-col align-middle items-center justify-center">
      <div>
        <Image 
          src="assets/person-prohibited.svg"
          width={100}
          height={100}
          alt="prohibited"
        />
      </div>
      <div className="text-primary-azure text-lg mt-4 opacity-70 text-center">
        You are not authorized to access this page
      </div>
      <div className="text-primary-azure text-lg mt-6 opacity-60 font-semibold">Go to:</div>
      
      <div className="mt-2">
        <Link href="/login" className="text-purple-600 underline underline-offset-4 hover:cursor-pointer hover:text-purple-500">Patient Login</Link>
        <span className="text-primary-azure text-lg opacity-60 mx-4 font-semibold">or</span>
        <Link href="/admin_login" className="text-purple-600 underline underline-offset-4 hover:cursor-pointer hover:text-purple-500">Admin Login</Link>
      </div>

      <div className="note text-sm text-center text-border mt-8">
        Note: If you login to the admin page while still signed in as a patient, you are automatically logged out as a patient, and vice versa.
      </div>
    </section>
  )
}
