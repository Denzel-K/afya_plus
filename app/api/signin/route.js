import { connectToDB } from '../../../utils/database';
import Patient from '../../../models/patient';

// const handleErrors = (err) => {
//   console.log (err.message, err.code);

//   let errors = {
//     personal_details: {
//       email: '',
//       password: '',
//     }
//   };

//   if (err.code === 11000) {
//     errors.personal_details.email = "Email address already in use!";
//     return errors;
//   }

//   if (err.message.includes('Patient validation failed')) {
//     Object.values(err.errors).forEach(({ properties }) => {
//       const pathParts = properties.path.split('.');
//       if (pathParts.length > 1) {
//         errors[pathParts[0]][pathParts[1]] = properties.message;
//       }
//     });
//   }

//   return errors;
// } 

export const POST = async (req, res) => {
  await connectToDB();

  const { email, password } = await req.json();

  try {
    const patient = await Patient.login(email, password);

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
