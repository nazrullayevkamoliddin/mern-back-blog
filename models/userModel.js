const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required:true,
        unique:true
    },
    passwordHash: {
        type: String,
        required:true
    },
    avatarUrl:{   
        type: String
    },
},  {
        timestamps:true
    }
);

module.exports = mongoose.model('User',userModel);