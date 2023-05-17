import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export default async function findstudentrecord(req, res) {
  const { curcoach,id } = req.body;

  // Connect to MongoDB
  const client = await clientPromise;
  const db = client.db(process.env.DB);

  // Find the user in the database
  //const coach = await db.collection(process.env.COLLECTION).find({ coach: String(curcoach) }).toArray();
  const coach = await db.collection(process.env.COLLECTION).find({coach: String(curcoach)},{$sort:{'students._id':1}}).toArray();
  //console.log(coach[id].records);
  if (!coach) {
    return res.status(401).json({ message: 'Coach not found' });
  }

  const coachinfo = coach[id].records;
  res.status(200).json({ message: 'User Info Fetched',coachinfo });
}