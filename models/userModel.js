const mongoose = require('mongoose');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required:[true,'Email required.'],
        unique: true
    },
    password: {
        type: String,
    },
    mobile: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    deliveryCount: Number,
    deliverdFoodCount: Number,
    serviceDuration: String
});

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    console.log({resetToken}, this.passwordResetToken);
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model('User', userSchema);