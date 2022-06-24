const mongoose = require('mongoose')

const AllFilesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String,
    default: null
  }

}, { timestamps: true })

module.exports = mongoose.model('AllFiles', AllFilesSchema)
