import { connectToDB } from '../../../utils/database';
import Appointment from '../../../models/appointment';

export const GET = async () => {

  console.log("Starting appointment fetch:");

  try {
    await connectToDB();

    const appointments = await Appointment.find();

    if (!appointments) {
      console.log("Appointments not found");
      return new Response("Appointments not found", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(appointments), {
      status: 200,
    });
  } 
  catch (err) {
    console.error("Failed to fetch appointments:", err);
    return new Response("Failed to fetch appointments", {
      status: 500,
    });
  }
};
