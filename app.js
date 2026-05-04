const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('./models/user');

const authRoutes = require('./routes/auth');
const journalRoutes = require('./routes/journals');

const app = express();

mongoose.connect('mongodb://localhost:27017/travel-journal')
    .then(() => console.log("Database Connected"))
    .catch(err => console.log("Database Connection Error:", err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    }
}
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use('/', authRoutes);
app.use('/journals', journalRoutes); 

app.get('/', (req, res) => {
    res.redirect('/journals');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(3000, () => {
    console.log('Serving on port 3000');
});
