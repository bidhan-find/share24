const multer = require('multer')

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fieldSize: 1000000 * 150 }
}).single('image')

module.exports = upload
