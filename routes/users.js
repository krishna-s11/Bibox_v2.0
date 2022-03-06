const router = require('express').Router();
const { findById } = require('../models/userModel');
const User = require('../models/userModel');
const Donor = require('../models/donorModel');

router.get('/dashboard', async (req,res) => {
    const users = await User.find();
    
    res.status(200).json({
        status: 'succss',
        results: users.length,
        data:{
            users
        }
    })
})

router.get('/dashboard/:id', async (req,res) => {
    const user = await User.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })
})


module.exports = router;