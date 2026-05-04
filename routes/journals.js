const express = require('express');
const router = express.Router();
const Journal = require('../models/journal');

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
};

router.get('/', async (req, res) => {
    const journals = await Journal.find({}).populate('author');
    res.render('journals/index', { journals });
});

router.get('/new', isLoggedIn, (req, res) => {
    res.render('journals/new');
});

router.post('/', isLoggedIn, async (req, res) => {
    const journal = new Journal(req.body.journal);
    journal.author = req.user._id;
    await journal.save();
    res.redirect(`/journals/${journal._id}`);
});

router.post('/',isLoggedIn, async (req,res) => {
    const journal = new Journal(req.body.journal);
    journal.author = req.user._id;
    await journal.save();
    res.redirect(`/journals/${journal._id}`);
})

router.get('/:id', async (req, res) => {
    const journal = await Journal.findById(req.params.id).populate('author');
    res.render('journals/show', { journal });
});

router.get('/:id/edit', isLoggedIn, async (req, res) => {
    const journal = await Journal.findById(req.params.id);
    res.render('journals/edit', { journal });
});


router.put('/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    delete req.body.journal.destination;
    
    await Journal.findByIdAndUpdate(id, { ...req.body.journal });
    res.redirect(`/journals/${id}`);
});

router.delete('/:id', isLoggedIn, async (req, res) => {
    await Journal.findByIdAndDelete(req.params.id);
    res.redirect('/journals');
});

module.exports = router;


const express = require('express')