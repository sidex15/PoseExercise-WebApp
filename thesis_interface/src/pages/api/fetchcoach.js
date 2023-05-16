import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export default async function fetchcoach(req, res) {
  const { curcoach } = req.body;

  // Connect to MongoDB
  const client = await clientPromise;
  const db = client.db(process.env.DB);

  // Find the user in the database
  const coach = await db.collection(process.env.COLLECTION).findOne({ _id:new ObjectId(curcoach) });

  if (!coach) {
    return res.status(401).json({ message: 'Coach not found' });
  }

  const coachinfo = coach;
  res.status(200).json({ message: 'User Info Fetched',coachinfo });
}