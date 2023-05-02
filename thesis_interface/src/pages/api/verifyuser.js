import { MongoClient } from 'mongodb';


export default async function verifyuser(req, res) {
  const { username } = req.body;

  // Connect to MongoDB
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('thesis');

  // Find the user in the database
  const user = await db.collection('thesis').findOne({ username });

  if (!user) {
    
    res.status(200).json({ message: 'User Not Found'});
  }

  // TODO: Create a session and return a JWT token
  return res.status(401).json({ message: 'User found' });
}