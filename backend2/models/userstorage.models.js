import mongoose, { model } from "mongoose";

const userstorage=new mongoose.Schema({
    email: {type:String},
    address: {type:String},
    quantity: {type:Number},
    coin: {type:Number}
});

const userStorage=mongoose.model('userstorage',userstorage);

export default userStorage;