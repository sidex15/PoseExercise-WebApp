import clientPromise from '@/lib/mongodb';
import UserInfoContext from '@/pages/api/user_info-conntext';
import { useContext } from "react";
import { ObjectId } from 'mongodb';


export default async function deletecoach(req, res) {
  const { userid, coachid} = req.body;
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
    const Coachid = coachid
    const Userid = userid
    // Save the user to the database
    const coach = await usersCollection.findOne({_id: new ObjectId(Coachid)});
    const deletestud = await usersCollection.updateOne({_id: new ObjectId(Coachid)},{$pull:{students: Userid}});
    const deletecoach = await usersCollection.updateOne({_id: new ObjectId(Userid)},{$unset:{coach: String(coach._id)}});
    if (deletestud.acknowledged == true && deletecoach.acknowledged == true) {
      //console.error(deletestud,deletecoach,coach._id);
      res.status(200).json({ message: "Coach Removed" });
    } else {
      res.status(500).json({ message: 'Coach failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}