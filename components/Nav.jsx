import Image from 'next/image';

export default function Nav() {
  return (
    <nav className="w-full px-4 py-4 md:px-12 flex align-middle justify-start">
      <div className="flex justify-center">
        <Image
          src="assets/afyaplus_logo.svg"
          width={44}
          height={44}
          alt="afyaplus"
        />
        <span className="opacity-75 ml-4 text-lg font-bold hidden sm:flex justify-center mt-2 text-primary-azure ">AfyaPlus</span>
      </div>     
    </nav>
  )
}
