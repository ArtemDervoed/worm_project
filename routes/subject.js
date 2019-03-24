var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var db = require('../models/index');
var SubjectModel = require('../models/subject');

var Subject = SubjectModel(db.sequelize, Sequelize);

router.get('/', function(req, res, next) {
  if(!req.body) return res.sendStatus(400);
    Subject.findAll().then((subjects) => {
      if (subjects) {
        res.send({ "status": "200 OK", "Subjects":  subjects })
      } else {
        res.send({ "message": "Not found" });
      }
    }).catch((err) => {
      res.send({ "message": "Something went wrong" });
    });
  });

router.get('/:id', function(req, res, next) {
if(!req.body) return res.sendStatus(400);
    Subject.findAll({
    where: {
        id: req.params.id,
    }
    }).then((subject) => {
    if (subject) {
        res.send({ "status": "200 OK", "subject":  subject })
    } else {
        res.send({ "message": "Not found" });
    }
    }).catch((err) => {
    res.send({ "message": "Something went wrong" });
    });
});


router.post('/create', function(req, res, next) {
    Subject.create({
        name: req.query.name,
        description: req.query.description,
    }).then(function() {
      res.send({ "status": "201 Created" })
    }).catch((err) => {
      res.send({ "message": "Something went wrong" });
    });
  });

module.exports = router;
