// app/api/update/route.js
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function PUT(request) {
  await dbConnect();

  try {
    const { email, name } = await request.json();

    if (!email || !name) {
      return new Response(JSON.stringify({ success: false, error: 'Please provide both email and name' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const updatedUser = await User.findOneAndUpdate({ email }, { name }, { new: true });

    if (!updatedUser) {
      return new Response(JSON.stringify({ success: false, error: 'User not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify({ success: true, data: updatedUser }), {
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