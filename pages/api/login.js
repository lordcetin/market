import { MongoClient } from "mongodb";
import valid from '../../utils/valid';
import bcrypt from 'bcrypt';
import { createAccessToken,createRefreshToken } from '../../utils/generateToken'
import connectMongo from '../../connectMongo/connectMongo';
import Users from '../../models/userModel';

connectMongo()
    
//connectMongo().catch(() => res.status(405).json({error: "Error in the Connection"}))
export default async (req, res) => {
    switch(req.method){
        case "POST":
            await login(req,res)
            break;
    }
}
const login = async (req,res) => {
    try {
        // const client = await MongoClient.connect(process.env.MONGO_URI);
        // const db = client.db();
        // const usersCollection = db.collection("users");
        
        const {username,password} = JSON.parse(req.body)
        
        // const errorMsg = valid(req.body.email,req.body.password)
        // if(errorMsg){
        //    return res.status(400).json({err: errorMsg})
        // }

        const user = await Users.findOne({ username })
        if(!user) return res.json({err: 'This user does not exist'})
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.json({err:'Incorrect password'})
      
        const access_token = createAccessToken({id: user._id})
        const refresh_token = createRefreshToken({id: user._id})
    
        res.status(201).json({ 
            msg: "Login Success",
            refresh_token,
            access_token,
            user:{
                username: user.username,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                banner: user.banner,
                root: user.root,
                description: user.description,
                wallet: user.walletAddress
            }
        });
        
    } catch (err) {
        return res.status(500).json({err: err.message})
    }

}

