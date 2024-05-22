import User from '../models/user.model.js'
//We need to protect our users' passwords and usernames from this file so use bcryptjs and not bcrypt as the latter creates problems. bcryptjs is a package
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
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
      return res.status(404).json({message:"All fields are required."});
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
        res.json({message:error.message});
      }
};