const mongoose = require('mongoose')

const FolderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  foldername: {
    type: String,
    default: 'New Folder'
  },
  image: {
    type: String,
    default: null
  }

}, { timestamps: true })

module.exports = mongoose.model('Folder', FolderSchema)
