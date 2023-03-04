/* eslint-disable import/no-anonymous-default-export */
//import { MongoClient,ObjectId } from "mongodb";

import connectMongo from "../../connectMongo/connectMongo";
import Users from "../../models/userModel";

connectMongo()
export default async (req,res) => {

    switch(req.method){
        case "POST":
            await update(req,res)
            break;
    }
}
const update = async (req,res) => {
    try {
    const {bannerurl,avatarurl,desc,username} = JSON.parse(req.body);
    console.log(req.body);
    const user = await Users.findOne({username})
    let id = user._id
    const filter = { _id : id }
    const update = {banner:bannerurl,avatar:avatarurl,description:desc}

    let doc = await Users.findOneAndUpdate(filter,update,{ new: true, upsert: true});

    doc.save();

    res.status(200).json({
        data: await Users.findOne({ _id: id }),
        message: "Updated"
    });
    }catch(err){
        return res.status(500).json({err:err.message})
    }
    
}