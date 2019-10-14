const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const validateRegisterInput = require('./../helpers/register_validations');
const validateLoginInput = require('./../helpers/login_validations');
const User = require('./../models/user');
const {secret} = require('./../config/keys');

router.post('/register', async (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const user = await User.findOne({email: req.body.email});
  if (user) {
    return res.status(400).json({email: 'Email already exists'});
  }
  const newUser = new User({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        throw err;
      }
      newUser.password = hash;
      newUser.save().then(user => res.status(200).json({message: 'successful', user}));
    });
  })

});

router.post('/login', async (req, res) => {
  const {errors, isValid} = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({email})
  if (!user) {
    return res.status(200).json({"email": "user not found"});
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(200).json({password: 'Incorrect password'});
  }
  const payload = {
    id: user.id,
    name: user.name,
    avatar: user.avatar
  };
  jwt.sign(payload, secret, {expiresIn: '1d'}, (err, token) => {
    res.json({
      success: true,
      token: 'Bearer ' + token
    });
  })
});

router.get('/current_user', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    name: req.user.name,
    email: req.user.email,
    id: req.user.id
  });
});

module.exports = router;