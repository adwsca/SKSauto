import { MongoClient, ObjectId } from 'mongodb';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { FaArrowLeft } from 'react-icons/fa';


type Car = {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  photo: string;
  // Add more fields as necessary
};

// Reuse MongoClient for better performance
let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (!cachedClient) {
    cachedClient = await MongoClient.connect(process.env.MONGODB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return cachedClient.db(process.env.MONGODB_DB);
}

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

export default async function CarPage({ params }: { params: { locale: string, slug: string } }) {
  const slugParts = params.slug.split('-');
  const id = slugParts[slugParts.length - 1]; // Extract the ID from the slug

  const car = await getCarById(id);

  if (!car) {
    notFound();
    return null;
  }

  // Optionally validate that the rest of the slug matches the car's make, model, and year
  const expectedSlug = `${car.make.toLowerCase()}-${car.model.toLowerCase()}-${car.year}-${car._id}`;
  if (params.slug !== expectedSlug) {
    notFound(); // Slug doesn't match, so return a 404
    return null;
  }

  return (
    <div className="p-8">
      {/* Back to Inventory Link */}
      <Link href="/inventory" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
        <FaArrowLeft className="mr-2" />
        <span>Back to Inventory</span>
      </Link>
      <h1 className="text-3xl font-bold mb-4">
        {car.make} {car.model} ({car.year})
      </h1>
      <p className="text-gray-700 mb-4">Price: ${car.price}</p>
      <img src={car.photo.split(',')[0]} alt={`${car.make} ${car.model}`} className="w-full h-auto mb-4" />
      {/* Display other car details here */}
    </div>
  );
}
