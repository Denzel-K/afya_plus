import { connectToDB } from '../../../../utils/database';
import Appointment from '../../../../models/appointment';

export const GET = async (req, { params }) => {

  console.log("Starting appointment fetch:");

  try {
    await connectToDB();

    const appointment = await Appointment.find({
      creator: params.id
    }).populate('creator');


    if (!appointment) {
      console.log("Appointment not found");
      return new Response("Appointment not found", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(appointment), {
      status: 200,
    });
  } 
  catch (err) {
    console.error("Failed to fetch appointment:", err);
    return new Response("Failed to fetch appointment", {
      status: 500,
    });
  }
};
