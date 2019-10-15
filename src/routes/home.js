const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');

const upload = require('./../helpers/file_upload');
const Testimonial = require('./../models/testimonial');
const News = require('./../models/news');

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

router.delete('/testimonials/:id', async (req, res) => {
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

router.delete('/news/:id', async (req, res) => {
  const news = await News.findByIdAndRemove(req.params.id);

  if (!news) {
    return res.status(404).json({message: "no news article found"});
  }

  res.status(200).json({
    message: `news article deleted`,
    data: news
  });
});

module.exports = router;
