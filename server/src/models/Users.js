import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    savedRecipies: [{type: mongoose.Schema.Types.ObjectId, ref: "recipies"}]
})

export const UserModel = mongoose.model("users", UserSchema)