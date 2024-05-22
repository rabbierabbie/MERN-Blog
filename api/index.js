import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';//Noice the . before /

dotenv.config();
const app=express();
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('Connected');
})
.catch((e)=>{
    console.log(e);
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000!!");
});

app.use('/api/user',userRoute);//we use the use method here