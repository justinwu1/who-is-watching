const router = require('express').Router()
let Status = require('../models/status.model')

router.route('/').get(async (req, res) => {
  console.log('Getting to this route')
  Status.find()
    .then((statusData) => res.json(statusData))
    .catch((err) => res.status(404))
})

router.route('/add').post((req, res) => {
  const status = req.body.status
  const newStatus = new Status({ status })

  newStatus
    .save()
    .then(() => res.json('Status added!'))
    .catch((err) => res.status(400).json('Error: ', err))
})

module.exports = router
