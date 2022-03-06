const router = require('express').Router();
const { Router } = require('express');
const Donor = require('../models/donorModel');

router.post('/donate', async (req,res) => {
    try {
        const donor = await Donor.create({
            name: req.body.name,
            mobile: req.body.mobile,
            address: req.body.address
        });      
        res.status(200).json({
            status: "success",
            data: donor
        })
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;

