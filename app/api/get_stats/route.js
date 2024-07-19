import { connectToDB } from '../../../utils/database';
import Appointment from '../../../models/appointment';

export const GET = async () => {
  console.log("Starting appointment stats fetch:");

  try {
    await connectToDB();

    const appointmentStats = await Appointment.aggregate([
      {
        $group: {
          _id: "$apptStatus",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1
        }
      }
    ]);

    const defaultStats = {
      Pending: 0,
      Approved: 0,
      Cancelled: 0
    };

    appointmentStats.forEach(stat => {
      defaultStats[stat.status] = stat.count;
    });

    return new Response(JSON.stringify(defaultStats), {
      status: 200,
    });
  } 
  catch (err) {
    console.error("Failed to fetch appointment stats:", err);
    return new Response("Failed to fetch appointment stats", {
      status: 500,
    });
  }
};