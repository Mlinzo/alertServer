import sanctuaryLogic from '../logic/sanctuary.logic.js';
import controllerUtils from '../utils/controller.utils.js';
const { tryCatchResponce} = controllerUtils;
const { getSanctuaries, insertSanctuary, deleteSanctuary } = sanctuaryLogic;

const sanctuaryController = {
    getSanctuaries: (_, res) => {
        tryCatchResponce(res, () => {
            getSanctuaries().then( ({ errorMsg, sanctuaries }) => {
                if (errorMsg) return res.json({errorMsg});
                res.json({sanctuaries});    
            });
        });
    },

    addSanctuary: (req, res) => {
        tryCatchResponce(res, () => {
            insertSanctuary(req.body).then( ({errorMsg, sanctuaryLocation}) => {
                if (errorMsg) return res.json({errorMsg});
                res.json({sanctuaryLocation});
            });
        });
    },

    removeSanctuary: (req, res) => {
        tryCatchResponce(res, () => {
            deleteSanctuary(req.body).then( ({errorMsg, sanctuaryLocation}) => {
                if (errorMsg) return res.json({errorMsg});
                res.json(sanctuaryLocation);
            });
        });
    }
};

export default sanctuaryController;