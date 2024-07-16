import Link from "next/link";
import Image from "next/image";
import ApptForm from "../../components/ApptForm";

export default function NewAppointment() {
  return (
    <section className="w-full sm:w-5/6 md:w-2/5 m-auto">
      <div className="py-4">
        <Link href="/patient_dashboard" className="flex align-middle justify-between px-2 py-1 border-border border-2 w-1/6 rounded-md transition ease duration-200 hover:bg-input-bg">
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
        <h3 className="text-primary-azure text-4xl opacity-75 text-center">New appointment</h3>
        <br /><br />

        <ApptForm />
      </div>
    </section>
  )
}
