import Link from "next/link";
import Image from "next/image";

export default function BackBtn({ linkto }) {
  return (
    <Link href={linkto} className="flex align-middle justify-between px-2 py-1 border-border border-2 w-[100px] rounded-md transition ease duration-200 hover:bg-input-bg">
      <span className="text-lg font-semibold text-primary-azure opacity-75">Back</span>
      <Image 
        src="assets/back.svg"
        width={26}
        height={26}
        alt="back"
        className="ml-2"
      />
    </Link>
  )
}