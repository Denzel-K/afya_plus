// import withAuth from '../../utils/withAuth';
import AllAppts from "../../components/AllAppts";

export default function Admin_Dashboard() {
  return (
    <section className="p_dashboard md:px-8">
      <div className="page_type">
        ADMINISTRATOR
      </div>
      <div className="dash_grid">
        <div className="main_box">
          <div className="appt_container">
            <div className="appt_head">
              <span>Appointments</span>
            </div>

            <AllAppts />     
          </div>
        </div>

        <div className="profile_details">

        </div>
      </div>
    </section>
  )
}

// const ProtectedAdminDashboard = withAuth(Admin_Dashboard, ['admin']);
// export default ProtectedAdminDashboard;