import {connectToDB} from '../../../utils/database';
import Admin from '../../../models/admin';

export const POST = async(req, res) => {
  console.log("Starting admin creation:");
  await connectToDB();

  const {username, password} = await req.json();

  try {
    const newAdmin = await Admin.create({username, password});

    if(!newAdmin){
      console.log("Error creating admin");
      return new Response ("Error creating new admin", {status: 400});
    }

    return new Response (JSON.stringify(newAdmin), {status: 200});
  }
  catch (error) {
    console.log("Internal server error")
    return new Response ("Error creating new admin", {status: 500});
  }
}