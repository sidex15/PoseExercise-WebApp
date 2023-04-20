import { compare } from 'bcryptjs';
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const { username, password } = req.body;

  // Connect to MongoDB
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('thesis');

  // Find the user in the database
  const user = await db.collection('thesis').findOne({ username });

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  // Compare the password with the hashed password in the database
  const match = await compare(password, user.password);

  if (!match) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  // TODO: Create a session and return a JWT token

  res.status(200).json({ message: 'Login successful' });
}