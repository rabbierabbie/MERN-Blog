import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

export const test = (req, res) => {
  res.json({ message: 'API is working!' });
};
//This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using the JSON. stringify() method. The entire body is sent including {}

export const updateUser = async (req, res, next) => {
  //Before reaching this place we need to know that the user is authenticated
  if (req.user.id !== req.params.userId) {
    //We are comparing two ids here.
    //The req.params property is an object containing properties mapped to the named route “parameters”. For example, if you have the route /student/:id, then the “id” property is available as req.params.id. This object defaults to {}. 
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, 'Username must be between 7 and 20 characters')
      );
    }
    if (req.body.username.includes(' '))
      //includes() method is a JavaScript method that is used to check if a specific string or element is present in another string or array. 
     {
      return next(errorHandler(400, 'Username cannot contain spaces'));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, 'Username must be lowercase'));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {//Regex, metachars and quantifiers in js
      return next(
        errorHandler(400, 'Username can only contain letters and numbers')
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(//findById,findByIdAndUpdate,findByIdAndDelete
      req.user.id,
      {
        $set:{
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        }        
      },
      { new: true }

     // in newer versions of mongoose the default value is false. Now, after setting to true it returns the updated info.
    );
    const { password, ...prest } = updatedUser._doc;
    res.status(200).json(prest);
  } catch (error) {
    next(error);
  }
};
