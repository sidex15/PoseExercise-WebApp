import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export default async function findcoach(req, res) {
  const { invcodever } = req.body;

  // Connect to MongoDB
  const client = await clientPromise;
  const db = client.db(process.env.DB);

  // Find the user in the database
  const coach = await db.collection(process.env.COLLECTION).findOne({ invcode:invcodever });

  if (!coach) {
    return res.status(401).json({ message: 'Coach not found' });
  }

  const coachid = coach._id;
  res.status(200).json({ message: 'User Info Fetched',coachid });
}