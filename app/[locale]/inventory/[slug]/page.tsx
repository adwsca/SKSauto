// app/[locale]/inventory/[slug]/page.tsx

import { MongoClient, ObjectId } from 'mongodb';
import { notFound } from 'next/navigation';
import CarDetails from './CarDetails';

type Car = {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  photo: string;
  description: string;
  details: { name: string; items: string[] }[];
};

// Server-side function to connect to MongoDB
async function connectToDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI!, {
  //  useNewUrlParser: true,
  //  useUnifiedTopology: true,
  });
  await client.connect();
  return client.db(process.env.MONGODB_DB);
}

// Fetch the car data by ID
async function getCarById(id: string): Promise<Car | null> {
  try {
    const db = await connectToDatabase();
    const car = await db.collection('inventory').findOne({ _id: new ObjectId(id) });
    return car ? { ...car, _id: car._id.toString() } : null;
  } catch (error) {
    console.error('Failed to fetch car:', error);
    return null;
  }
}

// The main page component
export default async function CarPage({ params }: { params: { locale: string; slug: string } }) {
  const slugParts = params.slug.split('-');
  const id = slugParts[slugParts.length - 1]; // Extract the ID from the slug

  const car = await getCarById(id);

  if (!car) {
    notFound();
  }

  return <CarDetails car={car} />;
}
