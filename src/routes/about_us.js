const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');

const upload = require('./../helpers/file_upload');
const MainBanner = require('./../models/main_banner');
const IntroText = require('./../models/intro_text');
const AdvisoryBoardMember = require('./../models/advisory_board_members');
const ClinicalConsultant = require('./../models/clinical_consultant');

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


router.post('/intro_texts', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const newIntroText = new IntroText({
    text: req.body.text,
  });
  const introText = await newIntroText.save();
  if (!introText) {
    return res.status(400).json({message: "failed"});
  }
  res.status(201).json({message: "successful"});
});

router.get('/intro_text', async (req, res) => {
  const introText = await IntroText.find({});

  if (introText.length === 0) {
    return res.status(404).json({message: "no banners"});
  }

  res.status(200).json({
    message: `${introText.length} main found`,
    data: introText[introText.length - 1]
  });
});

router.get('/intro_texts', async (req, res) => {
  const introTexts = await IntroText.find({});

  if (introTexts.length === 0) {
    return res.status(404).json({message: "no banners"});
  }

  res.status(200).json({
    message: `${introTexts.length} main found`,
    data: introTexts
  });
});

router.delete('/intro_texts/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const introText = await IntroText.findByIdAndRemove(req.params.id);

  if (!introText) {
    return res.status(404).json({message: "no intro text found"});
  }

  res.status(200).json({
    message: `intro text deleted`,
    data: introText
  });
});


router.post('/advisory_board_members', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const newAdvisoryBoardMember = new AdvisoryBoardMember({
    name: req.body.name,
    designation: req.body.designation,
    about: req.body.about,
  });
  const advisoryBoardMember = await newAdvisoryBoardMember.save();
  if (!advisoryBoardMember) {
    return res.status(400).json({message: "failed"});
  }
  res.status(201).json({message: "successful"});
});

router.get('/advisory_board_members', async (req, res) => {
  const advisoryBoardMembers = await AdvisoryBoardMember.find({});

  if (advisoryBoardMembers.length === 0) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: `${advisoryBoardMembers.length} found`,
    data: advisoryBoardMembers[advisoryBoardMembers.length - 1]
  });
});

router.get('/advisory_board_members/:id', async (req, res) => {
  let advisoryBoardMember;
  try {
    advisoryBoardMember = await AdvisoryBoardMember.findById(req.params.id)
  } catch (e) {
  }
  if (!advisoryBoardMember) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: "found",
    data: advisoryBoardMember
  });
});

router.delete('/advisory_board_members/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const advisoryBoardMember = await AdvisoryBoardMember.findByIdAndRemove(req.params.id);

  if (!advisoryBoardMember) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: `deleted`,
    data: advisoryBoardMember
  });
});


router.post('/clinical_consultants', upload.single('image'), passport.authenticate('jwt', {session: false}), async (req, res) => {
  const newClinicalConsultant = new ClinicalConsultant({
    image: req.file.path,
    name: req.body.name,
    designation: req.body.designation,
    about: req.body.about,
  });
  const clinicalConsultant = await newClinicalConsultant.save();
  if (!clinicalConsultant) {
    return res.status(400).json({message: "failed"});
  }
  res.status(201).json({message: "successful"});
});

router.get('/clinical_consultants', async (req, res) => {
  const clinicalConsultants = await ClinicalConsultant.find({});

  if (clinicalConsultants.length === 0) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: `${clinicalConsultants.length} found`,
    data: clinicalConsultants[clinicalConsultants.length - 1]
  });
});

router.get('/clinical_consultants/:id', async (req, res) => {
  let clinicalConsultant;
  try {
    clinicalConsultant = await ClinicalConsultant.findById(req.params.id)
  } catch (e) {
  }
  if (!clinicalConsultant) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: "found",
    data: clinicalConsultant
  });
});

router.delete('/clinical_consultants/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const clinicalConsultant = await ClinicalConsultant.findByIdAndRemove(req.params.id);

  if (!clinicalConsultant) {
    return res.status(404).json({message: "not found"});
  }

  res.status(200).json({
    message: `deleted`,
    data: clinicalConsultant
  });
});

module.exports = router;