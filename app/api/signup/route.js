import {connectToDB} from '../../../utils/database';
import Patient from '../../../models/patient';

export const POST = async(req, res) => {
  console.log("Starting patient creation:")
  await connectToDB();

  const { name, birthDate, email, phone, gender, password, insurance_provider, insurance_number, allergies, current_meds, family_med_history } = await req.json();

  try {
    const newPatient = new Patient({
      personal_details: {
        name,
        birthDate,
        email,
        phone,
        gender,
        password,
      },
      medical_information: {
        insurance_provider,
        insurance_number,
        allergies,
        current_meds,
        family_med_history,
      }
    });

    await newPatient.save();

    return new Response(JSON.stringify(newPatient), {
      status: 200
    });
  } catch (error) {
    console.log(error)
    return new Response("Failed to register patient", {
      status: 500
    })
  }
}


/*
    // Create JWT token
    const token = jwt.sign(
      { id: newPatient._id, email: newPatient.personal_details.email },
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
