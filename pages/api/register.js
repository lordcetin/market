
import valid from '../../utils/valid';
const bcrypt = require('bcrypt');
import Users from '../../models/userModel';
import connectMongo from '../../connectMongo/connectMongo'

connectMongo()

//connectMongo().catch(() => res.status(405).json({error: "Error in the Connection"}))

export default async (req, res) => {
  switch(req.method){
    case "POST":
      await register(req,res)
      break;
  }
}
  const register = async (req,res) => {
  try {
    // const client = await MongoClient.connect(process.env.MONGO_URI);
    // const db = client.db();
    // const usersCollection = db.collection("users");
  
    const { username, email,password, confPass,walletAddress,description } = JSON.parse(req.body)
    
    const errMsg = valid(username, email, password, confPass)
    if(errMsg) return res.status(400).json({err: errMsg})

    const userName = await Users.findOne({username})
    if (userName) return res.status(400).json({ err: 'This user already exists.' })
  
    const passwordHash = await bcrypt.hash(password, 12)

    const newUser = new Users({
      username,email,password:passwordHash,description,walletAddress,createdAt:new Date().toUTCString()
    })

    await newUser.save();
    res.json({msg:"Register Success!"})
    // await usersCollection.insertOne({
    //   username: username,
    //   email: email,
    //   password: passwordHash,
    //   role: 'user',
    //   root: false,
    //   createdAt: new Date().toUTCString(),
    //   profile: {
    //     //avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png',
    //     banner: 'https://images.pexels.com/photos/176851/pexels-photo-176851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    //   }
    // });
    
  } catch (err) {
    return res.status(500).json({err: err.message})
  }
}
