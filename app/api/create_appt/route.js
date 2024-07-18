import { connectToDB } from '../../../utils/database';
import Appointment from '../../../models/appointment';

const handleErrors = (err) => {
  console.log (err.message, err.code);

  let errors = {
    doctor: '',
    apptDate: '',
    reason: ''
  };

  if (err.message.includes('Appointment validation failed')) {
    Object.values(err.errors).forEach( ({properties}) => {
      
      errors [properties.path] = properties.message;
    })
  }

  return errors;
} 

export const POST = async (req, res) => {
  console.log("Starting appointment creation:");
  await connectToDB();

  const { userId, creatorName, doctor, apptDate, reason } = await req.json();
  const createdAt = Date.now();
  const apptStatus = "Pending";

  try {
    // Assuming creator is the ID of the logged-in patient
    const newAppointment = await Appointment.create({ creator: userId, doctor, createdBy:creatorName, apptDate, reason, createdAt, apptStatus });

    return new Response(JSON.stringify(newAppointment), {status: 200})
  } 
  catch (err) {
    const errors = handleErrors(err);

    console.error("Failed to create new appointment:", err);
    return new Response(JSON.stringify(errors), {
      status: 500,
    });
  }
};
