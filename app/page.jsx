import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <section className="intro_page">
      <div className="intro_card">
        <h1 className="intro_head">
          Healthcare appointments made easy
        </h1>
        <br />
        <h2 className="text-xl text-center font-semibold text-primary-azure opacity-60">
          Book appointments with your healthcare providers effectively, at your own convenience.
        </h2>
        <br />
        <br />
        <Link className="start_btn btn" href="/register">
          Get Started
        </Link>

        
      </div>

      <Link href="/admin" className="flex align-middle w-1/6 self-end opacity-80 hover:opacity-100">
        <span>
          <Image 
            src="assets/shield-user.svg"
            width={24}
            height={24}
            alt="admin"
          />
        </span>
        <span className="ml-1 text-admin-blue font-semibold">ADMIN</span>
      </Link>
    </section>
  )
}
