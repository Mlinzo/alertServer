import utils from '../utils.js';
const {emitter, alertLocations, tryCatch,  addElement, deleteElement} = utils;

const alertController = {
    getAlerts: (req, res) => {
        tryCatch(res, () => res.json({alertLocations}));
    },

    addAlert: (req, res) => {
        tryCatch(res, () => {
            const {errorMsg, index} = addElement(alertLocations, req.body);
            if (errorMsg) { res.json({errorMsg}); return };
            res.json({index});
            emitter.emit('update', alertLocations);
        });
    },

    removeAlert: (req, res) => {
        tryCatch(res, () => {
            const ind = parseInt(req.body.index);
            if (isNaN(ind)) res.json({message: 'Invalid index'});
            const {errorMsg} = deleteElement(alertLocations, ind);
            if (errorMsg) { res.json({errorMsg}); return };
            res.sendStatus(200);
            emitter.emit('update', alertLocations);
        });
    }
};

export default alertController;