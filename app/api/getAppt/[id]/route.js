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


export const PATCH = async (req, { params }) => {
  console.log("Starting status update:")
  const { newStatus} = await req.json();

  try{
    connectToDB();

    const existingAppt= await Appointment.findById(params.id);

    if(!existingAppt){
      console.log("Appointment not found!")
      return new Response("Appointment not found!", {
        status: 404
      })
    }

    existingAppt.apptStatus = newStatus;

    await existingAppt.save();

    return new Response(JSON.stringify(existingAppt), {
      status: 200
    });
  }
  catch(err){
    console.log("Failed to update appointment status");
    return new Response("Failed to update appointment status", {
      status: 500
    })
  }
}