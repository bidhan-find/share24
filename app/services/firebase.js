const admin = require('firebase-admin')
const serviceAccount = require('../../firebase-adminsdk.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'share-24.appspot.com'
})
const bucket = admin.storage().bucket()
module.exports = bucket
