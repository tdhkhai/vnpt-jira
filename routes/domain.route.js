const express = require('express');
const app = express();
const domainRoute = express.Router();

// Domain model
let Domain = require('../models/Domain');

// Add Domain
domainRoute.route('/create').post((req, res, next) => {
  Domain.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Domains
domainRoute.route('/').get((req, res) => {
  Domain.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get All Domains Activated
domainRoute.route('/activatedDomains').get((req, res) => {
  Domain.find({ status: 1 }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single Domain
domainRoute.route('/read/:id').get((req, res) => {
  Domain.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Domain
domainRoute.route('/update/:id').put((req, res, next) => {
  Domain.findByIdAndUpdate(req.params.id, {
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

// Delete Invoice
domainRoute.route('/delete/:id').delete((req, res, next) => {
  Domain.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})


module.exports = domainRoute;