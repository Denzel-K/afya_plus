import { connectToDB } from '../../../utils/database';
import Patient from '../../../models/patient';
// import jwt from 'jsonwebtoken';
// import { setCookie } from 'nookies';

export const POST = async (req, res) => {
  await connectToDB();

  const { email, password } = await req.json();

  try {
    const patient = await Patient.login(email, password);
/*
    // Create JWT token
    const token = jwt.sign(
      { id: patient._id, email: patient.personal_details.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Set HTTP-only cookie with the token
    setCookie({ res }, 'token', token, {
      maxAge: 3600, // 1 hour expiration
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Secure in production environment
      sameSite: 'strict' // Adjust as needed
    });
*/
    return new Response(JSON.stringify({ patient }), {
      status: 200
    });
  } catch (error) {
    console.log(error)
    return new Response("Failed to sign in", {
      status: 500
    })
  }
}
