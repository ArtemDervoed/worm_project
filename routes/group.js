var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var db = require('../models/index');
var GroupModel = require('../models/group');
var SubjectModel = require('../models/subject');
var GroupSubjectModel = require('../models/groupsubject');

var Group = GroupModel(db.sequelize, Sequelize);
var GroupSubject = GroupSubjectModel(db.sequelize, Sequelize);
var Subject = SubjectModel(db.sequelize, Sequelize);

router.get('/', function(req, res, next) {
  if(!req.body) return res.sendStatus(400);
    Group.findAll().then((groups) => {
      if (groups) {
        res.send({ "status": "200 OK", "groups":  groups })
      } else {
        res.send({ "message": "Not found" });
      }
    }).catch((err) => {
      res.send({ "message": "Something went wrong", "error": err });
    });
  });

router.get('/:group_id', function(req, res, next) {
  if(!req.body) return res.sendStatus(400);
    Group.findOne({
    where: {
        id: req.params.group_id,
    }
    }).then((group) => {
    if (group) {
        res.send({ "status": "200 OK", "group":  group })
    } else {
        res.send({ "message": "Not found" });
    }
    }).catch((err) => {
    res.send({ "message": "Something went wrong" });
    });
});


router.post('/create', function(req, res, next) {
    Group.create({
        group_number: req.query.group_number,
    }).then(function() {
      res.send({ "status": "201 Created" })
    }).catch((err) => {
      res.send({ "message": "Something went wrong" });
    });
  });

router.post('/add_subject', function(req, res, next) {
  console.log(req.query)
  GroupSubject.create({
    group_id: req.query.group_id,
    subject_id: req.query.subject_id,
  }).then(function() {
    res.send({ "status": "201 Created" })
  }).catch((err) => {
    res.send({ "message": "Something went wrong", "error": err });
  });
});

router.get('/:group_id/allow_subjects', function(req, res, next) {
  if(!req.body) return res.sendStatus(400);
  // SELECT * FROM public."Subjects" WHERE id IN (
    db.sequelize.query(`SELECT * FROM public."Subjects" WHERE id IN (SELECT subject_id FROM public."GroupSubjects" WHERE group_id = ${req.params.group_id})`)
    .then((subjects) => {
      if (subjects) {
        res.send({ "status": "200 OK", "subjects":  subjects[0] })
      } else {
        res.send({ "message": "Not found" });
      }
    }).catch((err) => {
      res.send({ "message": "Something went wrong", "error": err });
    });
  });

module.exports = router;
