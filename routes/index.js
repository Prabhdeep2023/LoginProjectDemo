var express = require('express');
var router = express.Router();

var db = require('../database');

/* add description for the methods */
router.get("/", (req, res) => {      /* use request, response instead of re, res */
  var sessionvar = req.session;
  if (sessionvar.user_id)
      res.render("dashboard", { session: req.session });
  else
      res.render("index",  { session: req.session });
});

module.exports = router;
