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

router.get('/testimonials/:id', async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: "found",
    data: testimonial
  });
});

router.get('/testimonials', async (req, res) => {
  const testimonials = await Testimonial.find({});

  if (testimonials.length === 0) {
    res.status(404).json({message: "no testimonials"});
  }

  res.status(200).json({
    message: `${testimonials.length} testimonials found`,
    data: testimonials
  });
});

router.delete('/testimonials/:id', async (req, res) => {
  const testimonial = await Testimonial.findByIdAndRemove(req.params.id);

  if (!testimonial) {
    res.status(404).json({message: "no testimonial found"});
  }

  res.status(200).json({
    message: `testimonial deleted`,
    data: testimonial
  });
});

module.exports = router;
