import { MongoClient } from 'mongodb';


export default async function createUser(req, res) {
  const { username, password, firstName, middleName, lastName, birthDate, weight, height, sex } = req.body;

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  // Validate the form data
  // ...


  try {
    await client.connect();
    const database = client.db('thesis');
    const usersCollection = database.collection('thesis');
    
    // Create a new user object
    const newUser = { username, password, firstName, middleName, lastName, birthDate, weight, height, sex };

    // Save the user to the database
    const result = await usersCollection.insertOne(newUser);
    if (result.insertedCount === 1) {
      res.status(200).json({ message: 'Registration successful!' });
    } else {
      res.status(500).json({ message: 'User creation failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    await client.close();
  }
}