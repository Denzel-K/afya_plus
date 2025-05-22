import Image from 'next/image';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="w-full px-6 py-6 md:px-12 flex items-center justify-between">
      <Link href="/" className="flex items-center group transition-transform duration-300 hover:scale-105">
        <div className="flex items-center">
          <Image
            src="/assets/afyaplus_logo.svg"
            width={48}
            height={48}
            alt="AfyaPlus Logo"
            className="transition-transform duration-300 group-hover:rotate-12"
          />
          <span className="ml-4 text-lg font-bold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
            AfyaPlus
          </span>
        </div>
      </Link>

      <div className="hidden md:flex md:items-center space-x-6">
        <Link href="/login" className="text-text-primary hover:text-accent-primary transition-colors duration-300">
          Login
        </Link>
        <Link href="/register" className="px-4 py-2 bg-gradient-to-r from-gradient-start to-gradient-mid text-white rounded-lg hover:from-gradient-start hover:to-gradient-end transition-all duration-300 shadow-button hover:shadow-button-hover">
          Register
        </Link>
      </div>
    </nav>
  )
}
