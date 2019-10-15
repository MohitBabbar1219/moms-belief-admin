const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');

const upload = require('./../helpers/file_upload');
const MainBanner = require('./../models/main_banner');

router.post('/main_banner', upload.single('image'), passport.authenticate('jwt', {session: false}), async (req, res) => {
  const newMainBanner = new MainBanner({
    image: req.file.path,
    title: req.body.title,
  });
  const mainBanner = await newMainBanner.save();
  if (!mainBanner) {
    return res.status(400).json({message: "failed"});
  }
  res.status(201).json({message: "successful"});
});

router.get('/main_banner', async (req, res) => {
  const mainBanners = await MainBanner.find({});

  if (mainBanners.length === 0) {
    return res.status(404).json({message: "no banners"});
  }

  res.status(200).json({
    message: `${mainBanners.length} main found`,
    data: mainBanners[mainBanners.length - 1]
  });
});

router.get('/main_banners', async (req, res) => {
  const mainBanners = await MainBanner.find({});

  if (mainBanners.length === 0) {
    return res.status(404).json({message: "no banners"});
  }

  res.status(200).json({
    message: `${mainBanners.length} main found`,
    data: mainBanners
  });
});

router.delete('/main_banners/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const mainBanner = await MainBanner.findByIdAndRemove(req.params.id);

  if (!mainBanner) {
    return res.status(404).json({message: "no banner found"});
  }

  res.status(200).json({
    message: `banner deleted`,
    data: mainBanner
  });
});

module.exports = router;