/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable semi */

const Folder = require('../../../models/Folder');

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
        }
    }
};

module.exports = folderController;
