const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');

const upload = require('./../helpers/file_upload');
const Testimonial = require('./../models/testimonial');

router.post('/testimonials', upload.single('testimonialImage'), passport.authenticate('jwt', { session: false }), async (req, res) => {
  const newTestimonial = new Testimonial({
    image: req.file.path,
    content: req.body.content,
    author: req.body.author
  });

  const testimonial = newTestimonial.save();

  if (!testimonial) {
    res.status(400).json({message: "failed"});
  }

  res.status(201).json({message: "successful"});
});

module.exports = router;
