import utils from '../utils.js';
const { emitter, sanctuaries, tryCatch, addElement, deleteElement} = utils;

const sanctuaryController = {
    getSanctuaries: (req, res) => {
        tryCatch(res, () => res.json({sanctuaries}));
    },

    addSanctuary: (req, res) => {
        tryCatch(res, () => {
            const {errorMsg, index} = addElement(sanctuaries, req.body);
            if (errorMsg) { res.json({errorMsg}); return };
            res.json({index});
            emitter.emit('update', sanctuaries);
        });
    },

    removeSanctuary: (req, res) => {
        tryCatch(res, () => {
            const ind = parseInt(req.body.index);
            if (isNaN(ind)) res.json({message: 'Invalid index'});
            const {errorMsg} = deleteElement(sanctuaries, ind);
            if (errorMsg) { res.json({errorMsg}); return };
            res.sendStatus(200);
            emitter.emit('update', sanctuaries);
        });
    }
};

export default sanctuaryController;