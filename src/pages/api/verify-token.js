import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Token missing' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Token is valid, return the user ID
    res.status(200).json({ userId: decoded.userId });
  } catch (error) {
    if (error.message === 'jwt expired') {
      // Token has expired, return a 401 Unauthorized response
      res.status(401).json({ message: 'Token expired' });
    } else {
      // Some other error occurred, return a 500 Internal Server Error response
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}