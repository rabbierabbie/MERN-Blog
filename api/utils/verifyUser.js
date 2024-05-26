import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  //The req. cookies property is used when the user is using cookie-parser middleware. This property is an object that contains cookies sent by the request.
  if (!token) {
    return next(errorHandler(401, 'Unauthorized'));
  }
  //Read : https://www.npmjs.com/package/jsonwebtoken
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Unauthorized'));
    }
    req.user = user;//user global state
    next();
  });
};