const express = require('express');
const router = express.Router();

const User = require('../models/user.js');



//COMMUNITY INDEX
router.get('/', async (req, res) => {
   try{
    const users = await User.find();
    res.render('users/index.ejs' , {users});
} catch (error) {
    console.log(error);
    res.redirect('/');
}
});


//SHOWPAGE FOR USER
router.get('/:userId', async (req, res) => {
    const selectedUser = await User.findById(req.params.userId);
    res.render('users/show.ejs', {pantry: selectedUser.pantry});
});

module.exports = router;