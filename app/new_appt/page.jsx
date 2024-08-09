import Link from "next/link";
import Image from "next/image";
import ApptForm from "../../components/ApptForm";
import BackBtn from "../../components/BackBtn";

export default function NewAppointment() {
  return (
    <section className="w-full sm:w-5/6 md:w-2/5 m-auto">
      <div className="py-4">
        <BackBtn 
          linkto="/patient_dashboard"
        />
      </div>
      <div className="md:px-16 py-8 px-6 rounded-lg bg-eerie-black">
        <h3 className="text-primary-azure text-4xl opacity-75 text-center">New appointment</h3>
        <br /><br />

        <ApptForm />
      </div>
    </section>
  )
}
