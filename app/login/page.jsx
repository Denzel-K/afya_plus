import LoginForm from "../../components/LoginForm";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (    
    <section className="w-full sm:w-5/6 md:w-2/5 m-auto md:px-16 py-8 px-6 rounded-lg bg-eerie-black">
      <h3 className="text-primary-azure text-4xl opacity-75 text-center">Login</h3>
      <p className="text-center font-semibold text-primary-azure opacity-60 mt-2">Or</p>
      <Link href="/register" className="flex align-middle justify-center opacity-75 hover:opacity-100">
        <span className="mr-2 text-lg font-semibold text-pink-400">Register here</span>
        <Image 
          src="/assets/link-to.svg"
          width={24}
          height={24}
          alt="link-to"
        />
      </Link>
      <br />
      <br />

      <LoginForm />
    </section>
  )
}