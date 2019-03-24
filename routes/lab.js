var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var db = require('../models/index');
var LabModel = require('../models/Lab');

var Lab = LabModel(db.sequelize, Sequelize);

router.get('/', function(req, res, next) {
    if(!req.body) return res.sendStatus(400);
    Lab.findAll().then((Labs) => {
    if (Labs) {
        res.send({ "status": "200 OK", "Labs":  Labs })
    } else {
        res.send({ "message": "Not found" });
    }
    }).catch((err) => {
        res.send({ "message": "Something went wrong" });
    });
});
  
router.get('/:id', function(req, res, next) {
    if(!req.body) return res.sendStatus(400);
    Lab.findOne({
        where: {
            id: Number(req.params.id),
        }
    }).then((Lab) => {
        if (Lab) {
            res.send({ "status": "200 OK", "Lab":  Lab })
        } else {
            res.send({ "message": "Not found" });
        }
    }).catch((err) => {
        res.send({ "message": "Something went wrong", "err": err });
    });
});

router.post('/create', function(req, res, next) {
    Lab.create({
        name: req.query.name,
        description: req.query.description,
    }).then(function() {
        res.send({ "status": "201 Created" })
    }).catch((err) => {
        res.send({ "message": "Something went wrong" });
    });
});

router.post('/:lab_id/binding_test/:test_id', function(req, res, next) {
    let updateValues = { test_id: Number(req.params.test_id) };
    Lab.update(updateValues, {
        where: {
            id: req.params.lab_id
        }
    }).then((result) => {
        console.log(result);
        res.send({ "status": "Updates" })
    }).catch((err) => {
        res.send({ "message": "Something went wrong" });
    });
});

module.exports = router;