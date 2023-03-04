import jwt from 'jsonwebtoken'
import { createAccessToken } from '../../utils/generateToken';
import { MongoClient } from 'mongodb';
import connectMongo from '../../connectMongo/connectMongo';
import Users from '../../models/userModel';

connectMongo()

//connectMongo().catch(() => res.status(405).json({error: "Error in the Connection"}))

export default async (req, res) => {
  try{
      // const client = await MongoClient.connect(process.env.MONGO_URI);
      // const db = client.db();
      // const usersCollection = db.collection("users");

      const rf_token = req.cookies.refreshtoken;
      if(!rf_token) return res.status(400).json({err: 'Please login now!'})
    
      const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET)
      if(!result) return res.status(400).json({err: 'Your token is incorrect or has expired.'})

      const user = await Users.findById(result.id)

      if(!user) return res.status(400).json({err: 'User does not exist.'})

      const access_token = createAccessToken({id: user._id})
      res.json({
          access_token,
          user: {
              username: user.username,
              email: user.email,
              role: user.role,
              avatar: user.avatar,
              banner:user.banner,
              root: user.root
          }
      })
    }catch(err){
      return res.status(500).json({err: err.message})
    }
      
    }
