const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage')
const wikiPage = require('../views/wikipage')
const {Page, User} = require('../models')
const main = require('../views/main')

router.get('/', async (req, res, next) =>{
    const pages = await Page.findAll();
    res.send(main(pages));
})

router.get('/add', (req, res) =>{
    res.send(addPage());
})

router.get('/:slug', async (req, res, next) => {
    try {
        const page = await Page.findOne({where: {slug: req.params.slug}})
        res.send(wikiPage(page, await page.getAuthor()));
    } catch (err) {
        next(err);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const page = await Page.create({
            title: req.body.title,
            content: req.body.content,
            status: req.body.status
        })   
        const [author, wasCreated] = await User.findOrCreate({where:
            {name: req.body.name, email: req.body.email}});

        page.setAuthor(author);
        res.redirect(`/wiki/${page.slug}`);
    } catch (error) { next(error) }
})


module.exports = router;