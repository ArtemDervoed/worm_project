var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var db = require('../models/index');
var StudentModel = require('../models/student');

var Student = StudentModel(db.sequelize, Sequelize);

router.post('/', function(req, res, next) {
  Student.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    doc_number: req.body.doc_number,
    password: req.body.password,
  }).then(function() {
    res.send({ "status": "201 Created" })
  }).catch((err) => {
    res.send({ "message": "Something went wrong" });
  });
});

module.exports = router;
