import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import dotenv from "dotenv"

dotenv.config()


import {userRouter} from "./routes/users.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter)

mongoose.connect(`mongodb+srv://ruona:${process.env.PASSWORD}@receipes.lmcmfss.mongodb.net/${process.env.RECEIPES}?retryWrites=true&w=majority`).then(() => {
        console.log("Connected to database!");
        app.listen(8000, () => {
            console.log("server is running on port 8000");
        });
    })
    .catch((error) => {
        console.log(error);
    });


// app.listen(8000, () => {
//     console.log("listening to port 8000")
// })