import { compare } from 'bcryptjs';
import clientPromise from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

export default async function handler(req, res) {
  const { username, password } = req.body;

  // Connect to MongoDB
  const client = await clientPromise;
  const db = client.db(process.env.DB);

  // Find the user in the database
  const user = await db.collection(process.env.COLLECTION).findOne({ username });

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  // Compare the password with the hashed password in the database
  const match = await compare(password, user.password);

  if (!match) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const iduser = user._id;
  // TODO: Create a session and return a JWT token
  const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET);
  res.status(200).json({ message: 'Login successful',token,iduser });
}