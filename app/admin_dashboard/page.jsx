// import withAuth from '../../utils/withAuth';
import AllAppts from "../../components/AllAppts";
import Image from 'next/image';

export default function Admin_Dashboard() {
  return (
    <section className="p_dashboard md:px-8">
      <div className="page_type">
        ADMINISTRATOR
      </div>
      <div className="dash_grid">
        <div className="main_box mt-4 md:mt-0">
          <div className="appt_container a_appt_cont">
            <div className="appt_head">
              <span>Appointments</span>
            </div>

            <AllAppts />     
          </div>
        </div>

        <div className="profile_details appt_stats">
          <div className="appt_head mt-2">
            <span>Appointment Stats</span>
            <span>
              <Image 
                src="assets/stats.svg"
                width={40}
                height={40}
                alt="stats"
              />
            </span>
          </div>

          <div className="status_container w-full mt-4 flex flex-row align-middle justify-between md:flex-col ">
            <div className="status_type mt-4 px-2 py-2 bg-input-bg rounded-md w-20 sm:w-36 md:w-full">
              <div className="stat_head md:w-full flex align-middle justify-between opacity-75">
                <span className="text-Pending-clr text-base md:text-xl font-semibold hidden md:block">Pending</span>
                <span>
                 <Image 
                  src="assets/Pending.svg"
                  width={28}
                  height={28}
                  alt="pending"
                 />
                </span>
              </div>

              <div className="stat_no opacity-80 flex align-middle justify-center w-full md:h-20 text-4xl md:text-6xl text-Pending-clr font-semibold">
                <span>7</span>
              </div>
            </div>

            <div className="stat4s_type mt-4 px-2 py-2 bg-input-bg rounded-md w-20 sm:w-36 md:w-full">
              <div className="stat_head w-full flex align-middle justify-between opacity-75">
                <span className="text-Approved-clr text-base hidden md:block md:text-xl font-semibold">Approved</span>
                <span>
                 <Image 
                  src="assets/Approved.svg"
                  width={24}
                  height={24}
                  alt="pending"
                 />
                </span>
              </div>

              <div className="stat_no opacity-80 flex align-middle justify-center w-full md:h-20 text-4xl md:text-6xl text-Approved-clr font-semibold">
                12
              </div>
            </div>

            <div className="status_type mt-4 px-2 py-2 bg-input-bg rounded-md w-20 sm:w-36 md:w-full">
              <div className="stat_head w-full flex align-middle justify-between opacity-75">
                <span className="text-Cancelled-clr hidden md:block text-base md:text-xl font-semibold">Cancelled</span>
                <span>
                 <Image 
                  src="assets/Cancelled.svg"
                  width={24}
                  height={24}
                  alt="pending"
                 />
                </span>
              </div>

              <div className="stat_no opacity-80 flex align-middle justify-center w-full md:h-20 text-4xl md:text-6xl text-Cancelled-clr font-semibold">
                4
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// const ProtectedAdminDashboard = withAuth(Admin_Dashboard, ['admin']);
// export default ProtectedAdminDashboard;