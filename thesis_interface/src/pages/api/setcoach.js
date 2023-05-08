import clientPromise from '@/lib/mongodb';
import UserInfoContext from '@/pages/api/user_info-conntext';
import { useContext } from "react";
import { ObjectId } from 'mongodb';


export default async function setcoach(req, res) {
  const { userid, invcode } = req.body;
  //const { info } = useContext(UserInfoContext);
  //console.log(info);
  

  const client = await clientPromise;
  // Validate the form data
  // ...

  try {
    await client.connect();
    const database = client.db('thesis');
    const usersCollection = database.collection('thesis');
    
    // Create a new user object
    const Invcode = invcode
    const Userid = userid
    // Save the user to the database
    const coach = await usersCollection.findOne({invcode: Invcode});
    const insert = await usersCollection.updateOne({invcode: Invcode},{$push:{students: Userid}});
    const insertcoach = await usersCollection.updateOne({_id: new ObjectId(Userid)},{$set:{coach: String(coach._id)}});
    if (insert.acknowledged == true && insertcoach.acknowledged == true) {
      console.error(insert,insertcoach,coach._id);
      res.status(200).json({ message: "Coach Added" });
    } else {
      res.status(500).json({ message: 'Coach failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}