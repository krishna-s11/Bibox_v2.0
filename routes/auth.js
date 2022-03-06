const router = require('express').Router();
const crypto = require('crypto');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { json } = require('express');
const sendEmail = require('../utils/email');
const nodemailer = require('nodemailer');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/register', async (req, res) => {

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            mobile: req.body.mobile
        });
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRES
        });
        res.cookie('jwt', token, {
            httpOnly: true
        });
        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: user
            }
        })
    } catch (err) {
        res.status(400).json({ status: 'failed', message: err });
    }
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({status: 'failed', msg: 'Email is invalid'});

    const validPass = await bcryptjs.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({status: 'failed', msg: 'Password is invalid'});

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_EXPIRES});
    res.cookie('jwt', token, {
        httpOnly: true
    });

    res.header('authorization',token).json({
        status: 'success',
        token
    });
});
router.post('/login-with-google',async (req,res) => {
    let token = req.body.token;
    console.log(token);
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,  
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
      }
      verify().then( () => {
        console.log(token);
        res.cookie('session-token',token);
        res.send('success');

      }).catch(console.error);

})


router.get('/logout', async (req,res) => {
    res.clearCookie('session-token');
    res.status(200).json({status: 'success'});
})

router.post('/forgotPassword', async (req,res) => {
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(404).json({success: "failed", msg: "User not found"});
    console.log(user.name, user.email);

    //generate random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({validateBeforeSave: false});  

    const resetURL = `${req.protocol}://${req.get('host')}/api/user/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password to: ${resetURL}`;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'krishnasaxena69@gmail.com',
            pass: 'qwerty951753'
        }
    })
    
    let mailOptions = {
        from: 'krishnasaxena7142@gmail.com',
        to: 'krishnasaxena798@gmail.com',
        subject: 'Your password reset token (valid for 10 min)',
        text: message
    }
    
    transporter.sendMail(mailOptions,function(err,data) {
        if(err){
            console.log(err)
        }else{
            res.status(200).json({
                status: 'Success',
                message: 'Email sent'
            })
        }
    })

})

router.patch('/resetPassword/:token', async (req,res) => {
    
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne ({passwordResetToken: hashedToken, passwordResetExpires : {$gt: Date.now()}});

    if(!user) return res.status(400).json({status: 'failed', msg: 'User not found'})

    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_EXPIRES});

    res.status(200).json({
        status: 'success',
        token
    })
} )

module.exports = router;