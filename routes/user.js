var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var db = require('../models/index');
var StudentModel = require('../models/student');

var Student = StudentModel(db.sequelize, Sequelize);

router.post('/auth', function(req, res, next) {
  if(!req.body) return res.sendStatus(400);
    Student.find({
      where: {
        password: req.query.password,
        email: req.query.email,
      }
    }).then((student) => {
      if (student) {
        res.send({ "status": "200 OK", "student":  student })
      } else {
        res.send({ "message": "Not found" });
      }
    }).catch((err) => {
      res.send({ "message": "Something went wrong" });
    });
  });


router.post('/create', function(req, res, next) {
  Student.create({
    first_name: req.query.first_name,
    last_name: req.query.last_name,
    email: req.query.email,
    doc_number: req.query.doc_number,
    group_id: req.query.group_id,
    password: req.query.password,
  }).then(function() {
    res.send({ "status": "201 Created" })
  }).catch((err) => {
    res.send({ "message": "Something went wrong" });
  });
});

router.get('/', function(req, res, next) {
  if(!req.body) return res.sendStatus(400);
    Student.findAll({
      where: {
        id: Number(req.query.group_id),
      }
    }).then((students) => {
      if (students) {
        res.send({ "status": "200 OK", "students":  students })
      } else {
        res.send({ "message": "Not found" });
      }
    }).catch((err) => {
      res.send({ "message": "Something went wrong", "err": err });
    });
  });

  router.get('/:id', function(req, res, next) {
    if(!req.body) return res.sendStatus(400);
      Student.findOne({
        where: {
          id: Number(req.params.id),
        }
      }).then((student) => {
        if (student) {
          res.send({ "status": "200 OK", "student":  student })
        } else {
          res.send({ "message": "Not found" });
        }
      }).catch((err) => {
        res.send({ "message": "Something went wrong", "err": err });
      });
    });

module.exports = router;
