const router = require('express').Router();
const Logs = require('../models/Logs');

//get all logs
router
  .route('/')
  .get(async (req, res) => {
    try {
      let query = {};
      // if (req.query.q) {
      //   query = req.query.q;
      //   // logs = await Logs.find({
      //   //   $text: {
      //   //     $search: query,
      //   //   },
      //   // });
      //   logs = await Logs.find({
      //     message: { $regex: `${query}`, $options: '$i' },
      //   });
      // } else {
      //   logs = await Logs.find();
      // }
      if (req.query.q) {
        query = {
          $or: [
            { message: { $regex: req.query.q, $options: 'i' } },
            { tech: { $regex: req.query.q, $options: 'i' } },
          ],
        };
      }
      const logs = await Logs.find(query);
      res.json(logs);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        error: err.message,
      });
    }
  }) //add log
  .post(async (req, res) => {
    try {
      const { message, tech, attention } = req.body;

      const logFields = {
        message,
        tech,
        attention,
      };

      const newLog = new Logs(logFields);

      const log = await newLog.save();

      res.json(log);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        error: err.message,
      });
    }
  });

//update log
router
  .route('/:id')
  .put(async (req, res) => {
    const logFields = {};
    if (req.body.message) logFields.message = req.body.message;
    if (req.body.tech) logFields.tech = req.body.tech;

    if (Object.keys(req.body).includes('attention'))
      logFields.attention = req.body.attention;

    try {
      let log = await Logs.findById(req.params.id);

      if (!log) {
        return res.status(404).json({
          error: 'No Log Found with this id',
        });
      }
      // if (!logFields.message) logFields.message = log.message;
      // if (!logFields.tech) logFields.tech = log.tech;
      // if (!logFields.attention) logFields.message = log.message;
      log = await Logs.findByIdAndUpdate(
        req.params.id,
        { $set: logFields },
        { new: true }
      );
      res.json(log);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        error: err.message,
      });
    }
  })
  .delete(async (req, res) => {
    try {
      let log = await Logs.findById(req.params.id);

      if (!log) {
        return res.status(404).json({
          error: 'No Log Found with this id',
        });
      }

      const deletedLog = await Logs.findByIdAndRemove(req.params.id);

      res.json({
        msg: 'Log Deleted',
        log: deletedLog,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        error: err.message,
      });
    }
  });

router.route;
module.exports = router;
