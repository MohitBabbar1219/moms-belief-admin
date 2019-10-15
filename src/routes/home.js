const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');

const upload = require('./../helpers/file_upload');
const Testimonial = require('./../models/testimonial');
const News = require('./../models/news');
const Sponsor = require('./../models/sponsor');
const MediaMention = require('./../models/media_mention');

router.post('/testimonials', upload.single('testimonialImage'), passport.authenticate('jwt', {session: false}), async (req, res) => {
  const newTestimonial = new Testimonial({
    image: req.file.path,
    content: req.body.content,
    author: req.body.author
  });

  const testimonial = await newTestimonial.save();

  if (!testimonial) {
    return res.status(400).json({message: "failed"});
  }

  res.status(201).json({message: "successful"});
});

router.get('/testimonials/:id', async (req, res) => {
  let testimonial;
  try {
    testimonial = await Testimonial.findById(req.params.id)
  } catch (e) {
  }
  if (!testimonial) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: "found",
    data: testimonial
  });
});

router.get('/testimonials', async (req, res) => {
  const testimonials = await Testimonial.find({});

  if (testimonials.length === 0) {
    return res.status(404).json({message: "no testimonials"});
  }

  res.status(200).json({
    message: `${testimonials.length} testimonials found`,
    data: testimonials
  });
});

router.delete('/testimonials/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const testimonial = await Testimonial.findByIdAndRemove(req.params.id);

  if (!testimonial) {
    return res.status(404).json({message: "no testimonial found"});
  }

  res.status(200).json({
    message: `testimonial deleted`,
    data: testimonial
  });
});


router.post('/news', upload.single('image'), passport.authenticate('jwt', {session: false}), async (req, res) => {
  const newNews = new News({
    image: req.file.path,
    title: req.body.title,
    link: req.body.link,
    date: req.body.date
  });

  const news = await newNews.save();

  if (!news) {
    return res.status(400).json({message: "failed"});
  }

  res.status(201).json({message: "successful"});
});

router.get('/news/:id', async (req, res) => {
  let news;
  try {
    news = await News.findById(req.params.id)
  } catch (e) {
  }
  if (!news) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: "found",
    data: news
  });
});

router.get('/news', async (req, res) => {
  const news = await News.find({});

  if (news.length === 0) {
    return res.status(404).json({message: "no news articles found"});
  }

  res.status(200).json({
    message: `${news.length} news articles found`,
    data: news
  });
});

router.delete('/news/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const news = await News.findByIdAndRemove(req.params.id);

  if (!news) {
    return res.status(404).json({message: "no news article found"});
  }

  res.status(200).json({
    message: `news article deleted`,
    data: news
  });
});


router.post('/sponsors', upload.single('image'), passport.authenticate('jwt', {session: false}), async (req, res) => {
  const newSponsor = new Sponsor({
    image: req.file.path,
    name: req.body.name,
  });

  const sponsor = await newSponsor.save();

  if (!sponsor) {
    return res.status(400).json({message: "failed"});
  }

  res.status(201).json({message: "successful"});
});

router.get('/sponsors', async (req, res) => {
  const sponsors = await Sponsor.find({});

  if (sponsors.length === 0) {
    return res.status(404).json({message: "no sponsors articles found"});
  }

  res.status(200).json({
    message: `${sponsors.length} media mentions found`,
    data: sponsors
  });
});

router.get('/sponsors/:id', async (req, res) => {
  let sponsor;
  try {
    sponsor = await Sponsor.findById(req.params.id)
  } catch (e) {
  }
  if (!sponsor) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: "found",
    data: sponsor
  });
});

router.delete('/sponsors/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const sponsor = await Sponsor.findByIdAndRemove(req.params.id);

  if (!sponsor) {
    return res.status(404).json({message: "no sponsor found"});
  }

  res.status(200).json({
    message: `sponsor deleted`,
    data: sponsor
  });
});


router.post('/media_mentions', upload.single('image'), passport.authenticate('jwt', {session: false}), async (req, res) => {
  const newMediaMention = new MediaMention({
    image: req.file.path,
    text: req.body.text,
  });

  const mediaMention = await newMediaMention.save();

  if (!mediaMention) {
    return res.status(400).json({message: "failed"});
  }

  res.status(201).json({message: "successful"});
});

router.get('/media_mentions', async (req, res) => {
  const mediaMentions = await MediaMention.find({});

  if (mediaMentions.length === 0) {
    return res.status(404).json({message: "no media mentions found"});
  }

  res.status(200).json({
    message: `${mediaMentions.length} media mentions found`,
    data: mediaMentions
  });
});

router.get('/media_mentions/:id', async (req, res) => {
  let mediaMention;
  try {
    mediaMention = await MediaMention.findById(req.params.id)
  } catch (e) {
  }
  if (!mediaMention) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: "found",
    data: mediaMention
  });
});

router.delete('/media_mentions/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const mediaMention = await MediaMention.findByIdAndRemove(req.params.id);

  if (!mediaMention) {
    return res.status(404).json({message: "no media mention found"});
  }

  res.status(200).json({
    message: `media mention deleted`,
    data: mediaMention
  });
});

module.exports = router;
