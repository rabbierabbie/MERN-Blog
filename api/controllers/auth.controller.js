import User from '../models/user.model.js'
//We need to protect our users' passwords and usernames from this file so use bcryptjs and not bcrypt as the latter creates problems. bcryptjs is a package
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

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