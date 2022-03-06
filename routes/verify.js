const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = async function(req,res,next) {
    const token = req.cookies.jwt || req.cookies.session-token;
    if(!token) return res.status(401).json({status: 'failed', msg: 'Access denied'});

    try {
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);
        const currentUser = await User.findById(verified.id);
        res.locals.user = currentUser;
        console.log(res.locals.user);
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}