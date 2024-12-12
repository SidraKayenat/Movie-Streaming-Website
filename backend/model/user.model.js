// import mongoose from "mongoose";

// const userSchema = mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     default: "",
//   },
//   searchHistory: {
//     type: Array,
//     default: [],
//   },
// });

// //means that the name of the model shall be 'User' based on the UserSchema
// //the agay wala User shall be singular and capitalized because by default in database it is converted to users
// export const User = mongoose.model("User", userSchema);



import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {
        type: String,
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
    },
    image: {
        type: String,
        default: "",
    },
    searchHistory: {
        type: Array,
        default: [],
    },
    subscriptionPlan: {
        type: String,
        enum: ['Basic', 'Premium'], // Enforces only 'Basic' or 'Premium' as valid values
        default: 'Basic', // Default plan is 'Basic'
    },
});

// Create and export the User model based on the schema
export const User = mongoose.model('User', userSchema);
