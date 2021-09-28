'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String, 
        lowercase: true,
        minlenght: 3, 
        maxlength: 100,  
        required: true 
    },
    email: {
        type: String, 
        lowercase: true, 
        required: true 
    },
    phone: {
        type: Number,
        unique: 'Phone Number already exists',
        required: true,
        default: null,
    },
    joined_date: {
        type: Date,
        default: Date.now
    },
    // organization: {
    //     type: String, 
    //     maxlength: 30,
    //     required:true
    // },
    updated_at: {
        type: Date,
        default: Date.now
    },
})

UserSchema.pre('save', function(next) {
    this.updated_at = new Date;
    next();
});
module.exports = mongoose.model('User', UserSchema);
