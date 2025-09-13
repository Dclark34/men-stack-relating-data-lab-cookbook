const express = require('express');
const router = express.Router();

const User = require('../models/user.js');



//INDEX ROUTE
router.get('/', async (req, res) => {
   try{
    const currentUser = await User.findById(req.session.user._id);
    res.render('foods/index.ejs' , {
        pantry: currentUser.pantry,
   });
} catch (error) {
    console.log(error);
    res.redirect('/');
}
});

//NEW ROUTE GET
router.get('/new', (req, res) => {
    res.render('new.ejs');
});


//POST ROUTE for CREATE

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.push(req.body);
        await currentUser.save();
        res.redirect(`/users/<%=${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});




// DELETE ROUTE
router.delete('/:foodId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.id(req.params.foodId).deleteOne();
        await currentUser.save();
       res.redirect(`/users/<%=${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});



//EDIT ROUTE (GET)
router.get('/:foodId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const foodItem = currentUser.pantry.id(req.params.foodId);
        res.render('foods/edit.ejs', { foodItem : foodItem});
    } catch (error) {
        console.log(error)
        res.redirect('/');
    }
});

//EDIT POST (PUT)

router.put('/:foodId', async (req, res) => {
    try {
        const currentUser = await User. findById(req.session.user._id);
        const updatedFood = currentUser.pantry.id(req.params.foodId);
        updatedFood.set(req.body);
        await currentUser.save(); 
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});




module.exports = router;