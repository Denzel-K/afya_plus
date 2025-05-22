import Image from "next/image";
import Link from "next/link";
import RegForm from "../../components/RegForm";
import Nav from '../../components/Nav';

export default function Register() {
  return (
    <>
      <Nav />
      <section className="min-h-screen flex items-center justify-center px-4 py-12 bg-bg-dark">
      <div className="w-full max-w-5xl">
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
              Create Your Account
            </h1>
          </Link>
          <p className="text-text-secondary mt-2">Join AfyaPlus to manage your healthcare appointments</p>
        </div>

        <div className="bg-bg-card rounded-xl shadow-card p-4 sm:p-6">
          <RegForm />

          <div className="mt-6 text-center border-t border-border pt-6">
            <span className="text-text-secondary">Already have an account?</span>
            <Link
              href="/login"
              className="ml-2 text-accent-primary hover:text-accent-secondary transition-colors duration-300 flex items-center justify-center mt-2"
            >
              <span>Sign in instead</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
