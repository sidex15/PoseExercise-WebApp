import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export default async function findstudents(req, res) {
  const { curcoach } = req.body;

  // Connect to MongoDB
  const client = await clientPromise;
  const db = client.db('thesis');

  // Find the user in the database
  const coach = await db.collection('thesis').aggregate([{$match:{ coach: String(curcoach) }},{$project:{_id:1, username:1,firstName:1,middleName:1,lastName:1}},{$sort:{'students._id':-1}}]).toArray();
  //console.error(coach);
  if (!coach) {
    return res.status(401).json({ message: 'Coach not found' });
  }

  const coachinfo = coach;
  res.status(200).json({ message: 'User Info Fetched',coachinfo });
}