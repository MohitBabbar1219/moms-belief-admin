const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');

const upload = require('./../helpers/file_upload');
const HomeSubscription = require('./../models/home_subscription');
const ProgramAssistance = require('./../models/program_assistance');

router.post('/subscriptions', passport.authenticate('jwt', {session: false}), async (req, res) => {
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

  res.status(200).json({
    message: `${subscription.length} found`,
    data: subscription
  });
});

router.get('/subscriptions/:id', async (req, res) => {
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

router.put('/subscriptions/:id', upload.single('image'), passport.authenticate('jwt', {session: false}), async (req, res) => {
  let subscription;
  try {
    console.log(req.file);
    const updatedData = req.file ? {...req.body, image: req.file.path} : {...req.body};
    subscription = await HomeSubscription.findByIdAndUpdate(req.params.id, updatedData, {new: true});
  } catch (e) {
    console.log(e)
  }
  if (!subscription) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: "found",
    data: subscription
  });
});


router.delete('/subscriptions/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const subscription = await HomeSubscription.findByIdAndRemove(req.params.id);

  if (!subscription) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: `deleted`,
    data: subscription
  });
});


router.post('/programAssistances', upload.single('image'), passport.authenticate('jwt', {session: false}), async (req, res) => {
  const newSubscription = new ProgramAssistance({
    description: req.body.description,
    image: req.file.path,
    amount: req.body.amount,
  });
  const subscription = await newSubscription.save();
  if (!subscription) {
    return res.status(400).json({message: "failed"});
  }
  res.status(201).json({message: "successful"});
});

router.get('/programAssistances', async (req, res) => {
  const subscription = await ProgramAssistance.find({});

  res.status(200).json({
    message: `${subscription.length} found`,
    data: subscription
  });
});

router.get('/programAssistances/:id', async (req, res) => {
  let subscription;
  try {
    subscription = await ProgramAssistance.findById(req.params.id)
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

router.put('/programAssistances/:id', upload.single('image'), passport.authenticate('jwt', {session: false}), async (req, res) => {
  let programAssistance;
  try {
    console.log(req.file);
    const updatedData = req.file ? {...req.body, image: req.file.path} : {...req.body};
    programAssistance = await ProgramAssistance.findByIdAndUpdate(req.params.id, updatedData, {new: true});
  } catch (e) {
    console.log(e)
  }
  if (!programAssistance) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: "found",
    data: programAssistance
  });
});

router.delete('/programAssistances/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const subscription = await ProgramAssistance.findByIdAndRemove(req.params.id);

  if (!subscription) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: `deleted`,
    data: subscription
  });
});

module.exports = router;