const router = require('express').Router();
const Techs = require('../models/Techs');

//get Techs
router
  .route('/')
  .get(async (req, res) => {
    try {
      const techs = await Techs.find();

      res.json(techs);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        error: err.message,
      });
    }
  })
  .post(async (req, res) => {
    try {
      const { firstName, lastName } = req.body;

      const newTech = new Techs({
        firstName,
        lastName,
      });

      const tech = await newTech.save();
      res.json(tech);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        error: err.message,
      });
    }
  });

router.route('/:id').delete(async (req, res) => {
  try {
    const tech = await Techs.findById(req.params.id);
    if (!tech) {
      return res.status(404).json({
        error: 'No Log Found with this id',
      });
    }

    await Techs.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Tech deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;
