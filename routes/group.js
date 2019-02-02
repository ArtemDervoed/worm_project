var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var db = require('../models/index');
var GroupModel = require('../models/group');

var Group = GroupModel(db.sequelize, Sequelize);

router.get('/', function(req, res, next) {
  if(!req.body) return res.sendStatus(400);
    Group.findAll().then((groups) => {
      if (groups) {
        res.send({ "status": "200 OK", "groups":  Group })
      } else {
        res.send({ "message": "Not found" });
      }
    }).catch((err) => {
      res.send({ "message": "Something went wrong" });
    });
  });

router.get('/:group_id', function(req, res, next) {
if(!req.body) return res.sendStatus(400);
    Group.find({
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
    console.log(req.query)
    Group.create({
        group_number: req.query.group_number,
    }).then(function() {
      res.send({ "status": "201 Created" })
    }).catch((err) => {
      res.send({ "message": "Something went wrong" });
    });
  });

module.exports = router;
