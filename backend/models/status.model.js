const mongoose = require('mongoose')

const Schema = mongoose.Schema

const statusSchema = new Schema(
  {
    status: {
      type: Boolean,
    },
    user: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Status = mongoose.model('Status', statusSchema)

module.exports = Status
