import Link from "next/link";
import Image from "next/image";
import Nav from '../components/Nav';

export default function Home() {
  return (
    <>
      <Nav />
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="w-full md:w-[60%] mb-10 mx-auto py-8">
          <h1 className="intro_head text-4xl md:text-5xl lg:text-6xl">
            Healthcare appointments made easy
          </h1>

          <p className="text-base md:text-xl text-text-secondary mt-6 md:pr-12 leading-relaxed text-center">
            AfyaPlus simplifies healthcare management, allowing you to book appointments with your preferred healthcare providers at your convenience.
          </p>

          <div className="mt-10 mx-auto flex flex-col sm:flex-row gap-4">
            <Link className="start_btn btn mx-auto" href="/register">
              Get Started
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <section className="bg-bg-card py-16 px-6 md:px-12">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
            Why Choose AfyaPlus?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Feature 1 */}
            <div className="bg-bg-dark py-6 px-4 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-text-primary">Easy Scheduling</h3>
                <div className="w-12 h-12 bg-gradient-to-br from-gradient-start to-gradient-mid rounded-full flex items-center justify-center flex-shrink-0 ml-4">
                  <Image
                    src="/assets/calendar.svg"
                    width={24}
                    height={24}
                    alt="Easy Scheduling"
                    className="text-white"
                  />
                </div>
              </div>
              <p className="text-text-secondary text-base leading-relaxed">Book appointments with your preferred healthcare providers in just a few clicks.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-bg-dark py-6 px-4 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-text-primary">Patient-Centered</h3>
                <div className="w-12 h-12 bg-gradient-to-br from-gradient-mid to-gradient-end rounded-full flex items-center justify-center flex-shrink-0 ml-4">
                  <Image
                    src="/assets/user-hands.svg"
                    width={24}
                    height={24}
                    alt="Patient-Centered"
                    className="text-white"
                  />
                </div>
              </div>
              <p className="text-text-secondary text-base leading-relaxed">Designed with patients in mind, making healthcare access simpler and more convenient.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-bg-dark py-6 px-4 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-text-primary">Secure & Private</h3>
                <div className="w-12 h-12 bg-gradient-to-br from-gradient-end to-gradient-start rounded-full flex items-center justify-center flex-shrink-0 ml-4">
                  <Image
                    src="/assets/shield-keyhole.svg"
                    width={24}
                    height={24}
                    alt="Secure & Private"
                    className="text-white"
                  />
                </div>
              </div>
              <p className="text-text-secondary text-base leading-relaxed">Your health information is protected with the highest security standards.</p>
            </div>
          </div>
        </section>

        {/* Admin Link */}
        <div className="mt-auto py-4 px-6">
          <Link href="/admin_login" className="flex items-center justify-center md:justify-end opacity-80 hover:opacity-100 transition-opacity duration-300 w-full md:w-auto">
            <div className="flex items-center bg-bg-card px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <Image
                src="/assets/shield-user.svg"
                width={24}
                height={24}
                alt="admin"
                className="mr-2"
              />
              <span className="text-admin-blue font-semibold">ADMIN PORTAL</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
