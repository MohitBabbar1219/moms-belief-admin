const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');

const upload = require('../helpers/fileUpload');
const Center = require('../models/center');

router.post('/', upload.array('images', 4), async (req, res) => {
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
    doctorImage: req.files[1].path,
    imageOne: req.files[2].path,
    imageTwo: req.files[3].path,
    isFeatured: req.body.isFeatured
  });
  JSON.parse(req.body.trackImages).forEach((type, index) => newSubscription[type] = req.files[index].path);

  const subscription = await newSubscription.save();
  if (!subscription) {
    return res.status(400).json({message: "failed"});
  }
  res.status(201).json({message: "successful"});
});

router.get('/', async (req, res) => {
  const subscription = await Center.find({});

  res.status(200).json({
    message: `${subscription.length} found`,
    data: subscription
  });
});

router.put('/:id', upload.array('images', 4), passport.authenticate('jwt', {session: false}), async (req, res) => {
  let cityCenterCount;
  try {
    console.log(req.files);
    const updatedData = {...req.body,
      strengths: JSON.parse(req.body.strengths),
      address: JSON.parse(req.body.address),
      services: JSON.parse(req.body.services),
    };
    if (req.files.length > 0) {
      JSON.parse(req.body.trackImages).forEach((type, index) => updatedData[type] = req.files[index].path);
    }
    cityCenterCount = await Center.findByIdAndUpdate(req.params.id, updatedData, {new: true});
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

router.get('/:id', async (req, res) => {
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

router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
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