const router = require('express').Router()
let Status = require('../models/status.model')

router.route('/').get(async (req, res) => {
  Status.find()
    .then((statusData) => res.json(statusData))
    .catch((err) => res.status(404))
})

// POST routes for adding
router.route('/add').post(async (req, res) => {
  const status = req.body.status
  const user = req.body.user
  const newStatus = new Status({ status, user })

  newStatus
    .save()
    .then(() => res.json('Status added!'))
    .catch((err) => res.status(400).json('Error: ', err))
})

// Update routes
router.route('/update/:name').post((req, res) => {
  Status.findOne({ user: req.params.name })
    .then((status) => {
      status.status = req.body.status
      status
        .save()
        .then(() => res.json('Status updated!'))
        .catch((err) => res.status(400).json('Error: ' + err))
    })
    .catch((err) => res.status(400).json('Error' + err))
})
module.exports = router
