import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type:String,required:true },
    email: {type:String,required:true,unique:true},
    password: {type:String,require:true},
    role: {type:String,default:'user'},
    root: {type:Boolean,default:false},
    description:{type:String},
    walletAddress: {type:String},
    avatar: {type:String,default:'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg'},
    banner:{type:String,default:'https://bafybeihkjdaxrbzc37aqro7x5ggttlor6fbo3fbtv5zb3p4seiwyzxcqmi.ipfs.nftstorage.link'},
    createdAt:{type:String}
},{
    timestamps:true
})
const Users = mongoose.models.users || mongoose.model('users', userSchema)
export default Users