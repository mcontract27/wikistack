const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage')
const {Page} = require('../models')

router.get('/', (req, res) =>{
    res.redirect('/');
})

router.post('/', async (req, res, next) => {
    const page = new Page({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status,
        slug: req.body.title.replace(/\s+/g, "_").replace(/[^\w\-]+/g, '')
    })

    try {
        await page.save();
        res.redirect('/');
    } catch (error) { next(error) }
})


router.get('/add', (req, res) =>{
    res.send(addPage());
})


module.exports = router;