import jwt from 'jsonwebtoken';
import Patient from '../../../models/patient';
import { connectToDB } from '../../../utils/database';
import { parseCookies } from 'nookies';

export const GET = async (req, res) => {
  await connectToDB();
  console.log("Fetching specific patient:");

  // Retrieve cookies from the request
  const cookies = parseCookies({ req });
  const token = cookies.token;

  // Ensure the token exists
  if (!token) {
    console.log('Token not found in cookies');
    return new Response('Unauthorized', {
      status: 400
    });
  }

  console.log(token);

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
      console.log("Token decoding failed.")
    }
    console.log(decoded);

    // Fetch patient details from database
    const patient = await Patient.findById(decoded.id);
    console.log(patient);

    if (!patient) {
      console.log("Patient not found.")
      return new Response('Patient not found', {
        status: 404
      })
    }

    // Return patient details
    return new Response(JSON.stringify({ patient }), {
      status: 200
    });
  }
  catch (error) {
    console.error('Error verifying token:', error);
    return new Response('Unauthorized', {
      status: 400
    })
  }
}
