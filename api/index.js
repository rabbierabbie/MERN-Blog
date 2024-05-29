import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';//Notice the . before /
import authRoute from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.route.js';
import path from 'path';//The node:path module provides utilities for working with file and directory paths. It can be accessed using:

dotenv.config();
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('Connected');
})
.catch((e)=>{
    console.log(e);
});

const __dirname = path.resolve();//The path.resolve() method resolves a sequence of paths or path segments into an absolute path.
//If, after processing all given path segments, an absolute path has not yet been generated, the current working directory is used.
//The resulting path is normalized and trailing slashes are removed unless the path is resolved to the root directory.
//Zero-length path segments are ignored.
//If no path segments are passed, path.resolve() will return the absolute path of the current working directory.

const app=express();
app.use(express.json());
app.use(cookieParser());//Now we can extract cookie from browser without any problem

app.listen(3000,()=>{
    console.log("Server is running on port 3000!!");
});

app.use('/api/user',userRoute);//we use the use method here
app.use('/api/auth',authRoute);//didnt add / before api
app.use("/api/post",postRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));// This is going to find our project folder and run the index.html file for us.
//dist is used because we are uing vite.

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });//Whatever address we have except the threee given above, index.html would be opened.

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });