const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage')
const wikiPage = require('../views/wikipage')
const {Page} = require('../models')
const main = require('../views/main')

router.get('/', async (req, res, next) =>{
    const pages = await Page.findAll();
    console.log(pages);
    res.send(main(pages));
    // res.redirect('/');
})

router.get('/add', (req, res) =>{
    res.send(addPage());
})

router.get('/:slug', async (req, res, next) => {
    try {
        const page = await Page.findOne({where: {slug: req.params.slug}})
        res.send(wikiPage(page));
    } catch (err) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    const page = new Page({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status
    })

    try {
        await page.save();
        res.redirect(`/wiki/${page.slug}`);
    } catch (error) { next(error) }
})


module.exports = router;