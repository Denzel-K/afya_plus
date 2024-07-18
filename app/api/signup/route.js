import {connectToDB} from '../../../utils/database';
import Patient from '../../../models/patient';

const handleErrors = (err) => {
  console.log (err.message, err.code);

  let errors = {
    personal_details: {
      name: '',
      birthDate: '',
      email: '',
      gender: '',
      phone: '',
      password: '',
    },
    medical_information: {
      insurance_provider: '',
      insurance_number: ''
    }
  };

  if (err.code === 11000) {
    errors.personal_details.email = "Email address already in use!";
    return errors;
  }

  if (err.message.includes('Patient validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      const pathParts = properties.path.split('.');
      if (pathParts.length > 1) {
        errors[pathParts[0]][pathParts[1]] = properties.message;
      }
    });
  }

  return errors;
} 

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
  } 
  catch (err) {
    const errors = handleErrors(err);
    console.log(err);
    
    return new Response(JSON.stringify(errors), {
      status: 500
    })
  }
}