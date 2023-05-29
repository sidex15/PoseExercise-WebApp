import clientPromise from '@/lib/mongodb';
import UserInfoContext from '@/pages/api/user_info-conntext';
import { useContext } from "react";
import { ObjectId } from 'mongodb';


export default async function addrecord(req, res) {
  const { userid, extype, calburn, reps, avgreps, duration, result } = req.body;
  //const { info } = useContext(UserInfoContext);
  //console.log(info);
  

  const client = await clientPromise;
  // Validate the form data
  // ...

  try {
    await client.connect();
    const database = client.db(process.env.DB);
    const usersCollection = database.collection(process.env.COLLECTION);
    
    // Create a new user object
    const newrecords = { exce_id: new ObjectId(), date: new Date(), extype, calburn, reps, avgreps, duration, result };
    // Save the user to the database
    const insert = await usersCollection.updateOne({_id: new ObjectId(userid)},{$push:{records: newrecords}});
    if (insert.acknowledged == true) {
      //console.error(newrecords);
      res.status(200).json({ message: 'Records Added' });
    } else {
      res.status(500).json({ message: 'Add Records failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}