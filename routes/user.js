const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.redirect('/');
})

router.get('/:userid', (req, res) =>{

})

router.post('/', (req, res) => {

})

router.put('/:userid', (req, res) => {

})

router.delete('/:userid', (req, res) => {
    
})

module.exports = router;