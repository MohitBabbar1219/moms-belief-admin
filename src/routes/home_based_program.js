const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');

const upload = require('./../helpers/file_upload');
const HomeSubscription = require('./../models/home_subscription');

router.post('/subscriptions', upload.single('image'), passport.authenticate('jwt', {session: false}), async (req, res) => {
  const newSubscription = new HomeSubscription({
    title: req.body.title,
    link: req.body.link,
    amount: req.body.amount,
    tier: req.body.tier
  });
  const subscription = await newSubscription.save();
  if (!subscription) {
    return res.status(400).json({message: "failed"});
  }
  res.status(201).json({message: "successful"});
});

router.get('/subscriptions', async (req, res) => {
  const subscription = await HomeSubscription.find({});

  if (subscription.length === 0) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: `${subscription.length} found`,
    data: subscription
  });
});

router.get('/management_team_members/:id', async (req, res) => {
  let subscription;
  try {
    subscription = await HomeSubscription.findById(req.params.id)
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

router.delete('/management_team_members/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const subscription = await HomeSubscription.findByIdAndRemove(req.params.id);

  if (!subscription) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: `deleted`,
    data: subscription
  });
});

module.exports = router;