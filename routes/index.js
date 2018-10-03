var express = require('express');
var router = express.Router();

var passport = require('passport');

function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login')
  }
}

router.post('/login',
  passport.authenticate('local', { successRedirect: '/chat', failureRedirect: '/login' })
);

router.get('/chat', authenticationMiddleware (), function(req, res){
   res.render('chat', { username: req.user.username });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

module.exports = router;
