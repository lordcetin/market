import { MongoClient } from "mongodb";
import valid from '../../utils/valid';
import bcrypt from 'bcrypt';

export const handler = async (req, res) => {
  
    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db();
    const usersCollection = db.collection("users");

    const { username,email,password,confPass} = req.body
    const errMsg = valid(username,email,password,confPass)
    if(errMsg){
      res.status(400).json({err: errMsg})
    } 
    const users = await usersCollection.findOne({email:email})
    if(users) return res.status(400).json({err: 'This email already exists.'})

    
    const passwordHash = await bcrypt.hash(password, 12)
    await usersCollection.insertOne({
        nfts:[{
            uri:'',
            like:0,
            comment:0,
            share:0,
            views:0,
            volume:0,
            floor:0,
            owners:''
          }],
      tags:['cosmetaNftMarketplace'],
      createdAt:new Date().toUTCString(),
    });
    
    client.close();
    
    res.status(201).send({ Message: "User inserted" });

};

export default handler;