const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');

const upload = require('./../helpers/file_upload');
const School = require('./../models/school');

router.post('/schools', upload.single('image'), passport.authenticate('jwt', {session: false}), async (req, res) => {
  const newSubscription = new School({
    description: req.body.description,
    image: req.file.path,
    link: req.body.link,
  });
  const subscription = await newSubscription.save();
  if (!subscription) {
    return res.status(400).json({message: "failed"});
  }
  res.status(201).json({message: "successful"});
});

router.get('/schools', async (req, res) => {
  const subscription = await School.find({});

  if (subscription.length === 0) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: `${subscription.length} found`,
    data: subscription
  });
});

router.get('/schools/:id', async (req, res) => {
  let subscription;
  try {
    subscription = await School.findById(req.params.id)
  } catch (e) {
  }
  if (!subscription) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: "found",
    data: subscription
  });
});

router.delete('/schools/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const subscription = await School.findByIdAndRemove(req.params.id);

  if (!subscription) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: `deleted`,
    data: subscription
  });
});

module.exports = router;