const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');

const upload = require('./../helpers/file_upload');
const Center = require('./../models/center');

router.post('/centers', upload.array('images', 4), async (req, res) => {
  console.log(req.files);
  const newSubscription = new Center({
    title: req.body.title,
    url: req.body.url,
    doctor: req.body.doctor,
    type: req.body.type,
    address: JSON.parse(req.body.address),
    thumbImage: req.files[0].path,
    description: req.body.description,
    about: req.body.about,
    services: JSON.parse(req.body.services),
    aboutDoctor: req.body.aboutDoctor,
    strengths: JSON.parse(req.body.strengths),
    images: req.files.slice(1, 4).map(file => file.path),
    isFeatured: req.body.isFeatured
  });
  const subscription = await newSubscription.save();
  if (!subscription) {
    return res.status(400).json({message: "failed"});
  }
  res.status(201).json({message: "successful"});
});

router.get('/centers', async (req, res) => {
  const subscription = await Center.find({});

  if (subscription.length === 0) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: `${subscription.length} found`,
    data: subscription
  });
});

router.get('/centers/:id', async (req, res) => {
  let subscription;
  try {
    subscription = await Center.findById(req.params.id)
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

router.delete('/centers/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const subscription = await Center.findByIdAndRemove(req.params.id);

  if (!subscription) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: `deleted`,
    data: subscription
  });
});

module.exports = router;