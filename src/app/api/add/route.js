// app/api/add/route.js
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(req) {

  console.log('entered post req ADD')

  await dbConnect();
  req = await req.json()

  try {
    const newUser = new User(req);
    await newUser.save();
    return new Response(JSON.stringify({ success: true, data: newUser }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}