import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb'; // Import the connectToDatabase function

export async function POST(request: Request) {
  try {
    const body = await request.json(); // Parse the incoming JSON payload

    // Connect to the MongoDB database
    const client = await connectToDatabase();
    const db = client.db(process.env.MONGODB_DB); // Use the database name from environment variables
    const leads = db.collection('leads');

    // Insert the new lead into the leads collection
    const result = await leads.insertOne({
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      email: body.email,
      message: body.message,
      carUrl: body.carUrl,
      carDetails: {
        make: body.make,
        model: body.model,
        year: body.year,
        stocknumber: body.stocknumber,
      },
      request_type: body.request_type,
      formID: body.formID,
      tradeIn: body.tradeIn,
      submittedAt: new Date(),
    });

    return NextResponse.json({ message: 'Lead saved successfully', result }, { status: 200 });
  } catch (error) {
    console.error('Error saving lead:', error);
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
  }
}
