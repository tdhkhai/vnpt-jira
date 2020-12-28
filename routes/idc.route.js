const express = require('express');
const app = express();
const idcRoute = express.Router();

// IDC model
let IDC = require('../models/IDC');

// Add IDC
idcRoute.route('/create').post((req, res, next) => {
  IDC.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All IDCs
idcRoute.route('/').get((req, res) => {
  IDC.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get All IDCs Activated
idcRoute.route('/activatedIDCs').get((req, res) => {
  IDC.find({ status: 1 }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single IDC
idcRoute.route('/read/:id').get((req, res) => {
  IDC.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update IDC
idcRoute.route('/update/:id').put((req, res, next) => {
  IDC.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Push Extend IDC
idcRoute.route('/pushextendidc/:id').put((req, res, next) => {
  IDC.findByIdAndUpdate(
    req.params.id, {
    $set: { status: req.body.status },
    $push: { "extend": req.body.extend },
    safe: true, upsert: true, new: true
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Pull Extend IDC
idcRoute.route('/pullextendidc/:id').put((req, res, next) => {
  IDC.findByIdAndUpdate(
    req.params.id, {
    $pull: { "extend": { _id : req.body._id } },

  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Update Status IDC
idcRoute.route('/updatestatus/:id').put((req, res, next) => {
  IDC.findByIdAndUpdate(
    req.params.id, {
    $set: req.body,
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})


// Delete Invoice
idcRoute.route('/delete/:id').delete((req, res, next) => {
  IDC.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

// Count cusomer
idcRoute.route('/count-customers').get((req, res, next) => {
  IDC.aggregate([
    {
      "$group": {
        "_id": {
          "year": { "$dateToString": { "date": "$registrationDate", "format": "%Y" } },
        },
        "countAll": {
          "$sum": 1
        },
        "countActived": {
          "$sum": { "$cond": [{ $eq: ["$status", "1"] }, 1, 0] }
        },
        "countExtend": {
          "$sum": { "$cond": [{ $eq: ["$status", "2"] }, 1, 0] }
        },
        "countCanceled": {
          "$sum": { "$cond": [{ $eq: ["$status", "3"] }, 1, 0] }
        },
        "countNeedExtend": {
          "$sum": { "$cond": [{ $eq: ["$status", "3"] }, 1, 0] }
        }
      },
    },
    {
      "$sort" : {
        "_id.year" : -1
      }
    }
  ], (error, data) => {
    if (error) {
      
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})


module.exports = idcRoute;