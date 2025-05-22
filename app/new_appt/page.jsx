import Link from "next/link";
import Image from "next/image";
import ApptForm from "../../components/ApptForm";

export default function NewAppointment() {
  return (
    <section className="min-h-screen bg-bg-dark py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Link
              href="/patient_dashboard"
              className="inline-flex items-center text-text-secondary hover:text-accent-primary transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>

          <div className="bg-bg-card rounded-xl shadow-card overflow-hidden">
            <div className="bg-gradient-to-r from-gradient-start/10 to-gradient-mid/10 p-6 border-b border-border">
              <h1 className="text-2xl font-bold text-text-primary flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule New Appointment
              </h1>
              <p className="text-text-secondary mt-2 ml-9">Fill in the details below to book your appointment</p>
            </div>

            <div className="p-6">
              <ApptForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
