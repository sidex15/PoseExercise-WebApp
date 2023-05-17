import clientPromise from '@/lib/mongodb';


export default async function verifyuser(req, res) {
  const { username } = req.body;

  // Connect to MongoDB
  const client = await clientPromise;
  const db = client.db(process.env.DB);

  // Find the user in the database
  const user = await db.collection(process.env.COLLECTION).findOne({ username });

  if (!user) {
    
    res.status(200).json({ message: 'User Not Found'});
  }
  else {
    return res.status(401).json({ message: 'User found' });
  }
  // TODO: Create a session and return a JWT token
  
}