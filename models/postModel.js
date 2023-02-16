const mongoose = require('mongoose');

const postModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String, 
        required:true,
        unique:true
    },
    tags: {
        type: Array,
        default: [],
    },
    viewsCount: {
        type: Number,
        default: 0 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }, 
    imageUrl:String,
},  {
        timestamps:true
    }   
);

module.exports = mongoose.model('Post',postModel);