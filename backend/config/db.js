import mongoose from "mongoose"
// import { ENV_VARS } from "./envVARs.js";


export const connection = async()=>{
 try {
    await mongoose.connect("mongodb+srv://krutilborad2020:Krutil1230@cluster0.cnqwb.mongodb.net/netflix_db?retryWrites=true&w=majority&appName=Cluster0");
    console.log('db connection');
 } catch (error) {
    console.log("error connecting", error.message);
 }
}