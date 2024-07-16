// app/api/create_appt/index.js

import { connectToDB } from '../../../utils/database';
import Appointment from '../../../models/appointment';

export const POST = async (req, res) => {
  console.log("Starting appointment creation:");
  await connectToDB();

  const { userId, doctor, apptDate, reason } = await req.json();
  const createdAt = Date.now();
  const apptStatus = "Pending";

  try {
    // Assuming creator is the ID of the logged-in patient
    const newAppointment = await Appointment.create({ creator: userId, doctor, apptDate, reason, createdAt, apptStatus });

    return new Response(JSON.stringify(newAppointment), {status: 200})
  } 
  catch (error) {
    console.error("Failed to create new appointment:", error);
    return new Response("Failed to create new appointment", {
      status: 500,
    });
  }
};
