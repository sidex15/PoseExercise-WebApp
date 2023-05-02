import { MongoClient, ObjectId } from 'mongodb';

export default async function fetchuser(req, res) {
  const { userid } = req.body;

  // Connect to MongoDB
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('thesis');

  // Find the user in the database
  const user = await db.collection('thesis').findOne({ _id:new ObjectId(userid) });

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  const userinfo = user;
  res.status(200).json({ message: 'Login successful',userinfo });
}