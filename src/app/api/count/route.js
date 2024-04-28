// app/api/count/route.js
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function GET() {
  await dbConnect();

  try {
    const addCount = await User.countDocuments({ isUpdate: false });
    const updateCount = await User.countDocuments({ isUpdate: true });

    return new Response(JSON.stringify({ success: true, addCount, updateCount }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}