import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function createUser(req, res) {
  const { userid, firstName, middleName, lastName, birthDate, weight, height, sex } = req.body;

  const client = await clientPromise;
  // Validate the form data
  // ...


  try {
    await client.connect();
    const database = client.db(process.env.DB);
    const usersCollection = database.collection(process.env.COLLECTION);
    
    // Create a new user object
    const newUser = { firstName, middleName, lastName, birthDate, weight, height, sex};
    //console.log(userid);
    // Save the user to the database
    const result = await usersCollection.updateOne({_id: new ObjectId(userid)},{$set:newUser});
    if (result.acknowledged == true) {
      res.status(200).json({ message: 'User Updated' });
    } else {
      res.status(500).json({ message: 'User update failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}