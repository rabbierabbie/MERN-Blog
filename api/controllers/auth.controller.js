import User from '../models/user.model.js'
//We need to protect our users' passwords and usernames from this file so use bcryptjs and not bcrypt as the latter creates problems. bcryptjs is a package
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
//The curly braces are used only for import when export is named. If the export is default then curly braces are not used for import.

export const signup = async (req, res,next) => {//next is used to accessthe next middleware
    const { username, email, password } = req.body;
    const hashPassword=bcryptjs.hashSync(password,10);
    if (
      !username ||
      !email ||
      !password ||
      username === '' ||
      email === '' ||
      password === ''
    ) {
      next(errorHandler(400, 'All fields are required'));
    }
    const newUser = new User({
        username, //Here we could have written username:"username". But since both are the same, we use one.
        email,
        password:hashPassword
      });
      try {
        await newUser.save();
        res.json('Signup successful');        
      } catch (error) {
        next(error);
      }
};


export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) {
        return next(errorHandler(404, 'User not found'));
      }
      const validPassword = bcryptjs.compareSync(password, validUser.password);//We are merely comparing the two here and not decoding or anything
      if (!validPassword) {
        return next(errorHandler(400, 'Invalid password'));
      }
      const token = jwt.sign(
        { id: validUser._id, isAdmin: validUser.isAdmin },//notice the underscore in _id- it is a parameter and we will see it on mongoDB website
        process.env.JWT_SECRET,
        {expiresIn:'2 days'}
      );
  //We may even add an expiration time. But the default is it never expires. Also, the default unit is ms
      const { password: pass, ...rest } = validUser._doc;
  //Now we start creating a response with the status 200 as 200 is the ok response
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } catch (error) {
      next(error);
    }
  };