import connectMongo from "../../connectMongo/connectMongo";
import Users from "../../models/userModel";

connectMongo()

export default async (req, res) => {
    switch(req.method){
        case "GET":
          await userdata(req,res)
          break;
    }
}

const userdata = async(req,res) => {
  try {

    const users = await Users.find({})
    
    //res.query(data.username)
    res.status(200).json(users)
    
  } catch (err) {
    
  }
}