import utils from '../utils.js';
const { tryCatch } = utils;

const otherController = {
    notFound: (req, res) => tryCatch(res, () => res.sendStatus(404))
};

export default otherController;