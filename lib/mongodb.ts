import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const dbName = process.env.MONGODB_DB || '';

// Use a single global instance for better performance
let cachedClient: MongoClient | null = null;

export async function connectToDatabase(): Promise<MongoClient> {
  if (cachedClient) {
	return cachedClient; // Reuse existing connection
  }

  const client = new MongoClient(uri, {
//	useNewUrlParser: true,
//	useUnifiedTopology: true,
  });

  try {
	await client.connect(); // Ensure connection
	cachedClient = client;
	return client;
  } catch (error) {
	console.error('Error connecting to MongoDB:', error);
	throw error; // Rethrow error to be handled by caller
  }
}
