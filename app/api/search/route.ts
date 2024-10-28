import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const client = await connectToDatabase();
    const db = client.db(process.env.MONGODB_DB);

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const make = searchParams.get('make');
    const model = searchParams.get('model');
    const listBodyTypes = searchParams.get('listBodyTypes');

    if (listBodyTypes) {
      const BodyTypes = await db.collection('inventory').distinct('category');
      return NextResponse.json({ BodyTypes });
    }

    const query: any = {};
    if (category) query['category'] = category;
    if (make) query['make'] = make;
    if (model) query['model'] = model;

    const availableMakes = await db.collection('inventory').distinct('make', category ? { category } : {});
    const availableModels = await db.collection('inventory').distinct('model', make ? { ...query } : {});
    const availableYears = await db.collection('inventory').distinct('year', model ? { ...query } : {});

    return NextResponse.json({
      availableMakes,
      availableModels,
      availableYears,
    });
  } catch (error) {
    console.error('Error fetching filtered data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
