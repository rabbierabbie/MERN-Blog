import mongoose from 'mongoose';

const userSchema=new mongoose.Schema(
    { //starts like this
        username: {
          type: String,//these are all properties like type,unique
          required: true,
          unique: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        }, //ends like this
        profilePicture: {
          type: String,
          default:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        },
        isAdmin:{
          type:Boolean,
          default:false
        }
      },
    {timestamps:true}
);
const User = mongoose.model('User', userSchema);//MongoDB will automatically put an 's' after User

export default User;//but only one element can be exported to another component at a time as a default export.