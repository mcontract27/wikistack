const express = require('express');
const router = express.Router();
const {Page, User} = require('../models')
const {userList, userPages } = require('../views');


router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.send(userList(users));
    } catch (err){
        next(err)
    }
})

router.get('/:userid', async (req, res, next) =>{
    const user = await User.findById(req.params.userid);
    const pages = await Page.findAll({where:{authorId: req.params.userid}})
    res.send(userPages(user, pages));
})

module.exports = router;