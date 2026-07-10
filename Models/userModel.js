const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

// CORRECTION ICI : Ajout du champ role dans la validation Joi
function registerVerify(obj) {
    const schema = Joi.object({
        name: Joi.string().trim().min(2).max(100).required(),
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(8).required(),
        role: Joi.string().valid('user', 'admin').default('user') // <-- Autorise le rôle
    });
    return schema.validate(obj);
}

function loginVerify(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(8).required()
    });
    return schema.validate(obj);
}




function updateVerify(obj) {
    const schema = Joi.object({
        name: Joi.string().trim().min(2).max(100).optional(),
        email: Joi.string().trim().min(5).max(100).email().optional(),
        password: Joi.string().trim().min(8).optional(),
        role: Joi.string().valid('user', 'admin').optional() // <-- Autorise la modification du rôle
    });
    return schema.validate(obj);
}

module.exports = {
    User,
    registerVerify,
    loginVerify,
    updateVerify
};