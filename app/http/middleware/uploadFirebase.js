const { v4: uuid4 } = require('uuid')
const bucket = require('../../services/firebase')

function uploadFirebase (req, res, next) {
  if (!req.file) return next()
  const image = req.file
  const imageName = uuid4() + '-' + image.originalname
  const file = bucket.file('images/' + imageName)
  const strem = file.createWriteStream({
    metadata: {
      contentType: image.mimetype
    }
  })
  strem.on('error', (e) => {
    console.error(e)
  })
  strem.on('finish', async () => {
    await file.makePublic()
    req.file.firebaseUrl = `https://storage.googleapis.com/share-24.appspot.com/images/${imageName}`
    next()
  })
  strem.end(image.buffer)
};

module.exports = uploadFirebase
