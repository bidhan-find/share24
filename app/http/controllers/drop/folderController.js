/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable semi */

const AllFiles = require('../../../models/AllFiles');
const Folder = require('../../../models/Folder');
const bucket = require('../../../services/firebase');

function folderController() {
    return {
        createFolder(req, res) {
            const folder = new Folder({
                userId: req.user._id,
                foldername: req.body.foldername
            });
            folder.save().then(result => {
                Folder.populate(result, { path: 'userId' }, (_err, response) => {
                    res.status(201).json({ message: 'Folder create successfully', folder });
                });
            });
        },

        async getFolders(req, res) {
            const folders = await Folder.find({ userId: req.user._id }, null, { sort: { createdAt: -1 } });
            res.status(200).json({ folders });
        },

        async coverPhoto(req, res) {
            const findAllFiles = await AllFiles.findOne({ userId: req.user._id });
            if (!findAllFiles) {
                const allFiles = new AllFiles({
                    userId: req.user._id,
                    image: req.file.firebaseUrl
                });
                allFiles.save().then(result => {
                    Folder.populate(result, { path: 'userId' }, (_err, response) => {
                        res.status(201).json({ message: 'Cover photo uploaded', allFiles });
                    });
                });
            };
            const url = 'https://storage.googleapis.com/share-24.appspot.com/images/';
            const imageName = findAllFiles.image.split(url)[1];
            bucket.file(`images/${imageName}`).delete();
            const updateCoverPhoto = await AllFiles.findOneAndUpdate({
                id: req.user._id
            }, {
                image: req.file.firebaseUrl
            }, { new: true });
            if (updateCoverPhoto) return res.status(200).json({ message: 'Cover photo updated', updateCoverPhoto });
        }
    }
};

module.exports = folderController;
