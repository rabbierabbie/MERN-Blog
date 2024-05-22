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
        }
    }, //ends like this
    {timestamps:true}
);
const User = mongoose.model('User', userSchema);

export default User;//but only one element can be exported to another component at a time as a default export.