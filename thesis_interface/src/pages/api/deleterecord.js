import clientPromise from '@/lib/mongodb';
import UserInfoContext from '@/pages/api/user_info-conntext';
import { useContext } from "react";
import { ObjectId } from 'mongodb';


export default async function deleterecord(req, res) {
  const { userid, exceid} = req.body;
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
    const Userid = userid
    // Save the user to the database
    const deleterecord = await usersCollection.updateOne({_id: new ObjectId(Userid)},{$pull:{records: {exce_id: new ObjectId(exceid)}}});
    console.error(deleterecord);
    if (deleterecord.modifiedCount == true) {
      res.status(200).json({ message: "Record Removed" });
    } else {
      res.status(500).json({ message: 'Record failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}