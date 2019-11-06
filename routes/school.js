const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');

const upload = require('../helpers/fileUpload');
const School = require('../models/school');
const CityCenterCount = require('../models/cityCenterCount');

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

router.put('/schools/:id', upload.single('image'), passport.authenticate('jwt', {session: false}), async (req, res) => {
  let school;
  try {
    console.log(req.file);
    const updatedData = req.file ? {...req.body, image: req.file.path} : {...req.body};
    school = await School.findByIdAndUpdate(req.params.id, updatedData, {new: true});
  } catch (e) {
    console.log(e)
  }
  if (!school) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: "found",
    data: school
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


router.post('/cityCenterCounts', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const newSubscription = new CityCenterCount({
    city: req.body.city,
    count: req.body.count,
  });
  const subscription = await newSubscription.save();
  if (!subscription) {
    return res.status(400).json({message: "failed"});
  }
  res.status(201).json({message: "successful"});
});

router.get('/cityCenterCounts', async (req, res) => {
  const subscription = await CityCenterCount.find({});

  res.status(200).json({
    message: `${subscription.length} found`,
    data: subscription
  });
});

router.get('/cityCenterCounts/:id', async (req, res) => {
  let subscription;
  try {
    subscription = await CityCenterCount.findById(req.params.id)
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

router.put('/cityCenterCounts/:id', upload.single('image'), passport.authenticate('jwt', {session: false}), async (req, res) => {
  let cityCenterCount;
  try {
    console.log(req.file);
    const updatedData = req.file ? {...req.body, image: req.file.path} : {...req.body};
    cityCenterCount = await CityCenterCount.findByIdAndUpdate(req.params.id, updatedData, {new: true});
  } catch (e) {
    console.log(e)
  }
  if (!cityCenterCount) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: "found",
    data: cityCenterCount
  });
});

router.delete('/cityCenterCounts/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const subscription = await CityCenterCount.findByIdAndRemove(req.params.id);
  if (!subscription) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: `deleted`,
    data: subscription
  });
});

module.exports = router;