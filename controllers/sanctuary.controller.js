const sanctuaryService = require('../services/sanctuary.service.js');
const { tryCatchResponce} = require('../utils/controller.utils.js');

class SanctuaryController {
    getSanctuaries (_, res)  {
        tryCatchResponce(res, () => {
            sanctuaryService.getSanctuaries().then( ({ errorMsg, sanctuaries }) => {
                if (errorMsg) return res.json({errorMsg});
                res.json({sanctuaries});    
            });
        });
    }

    addSanctuary (req, res)  {
        tryCatchResponce(res, () => {
            sanctuaryService.insertSanctuary(req.body).then( ({errorMsg, sanctuaryLocation}) => {
                if (errorMsg) return res.json({errorMsg});
                res.json(sanctuaryLocation);
            });
        });
    }

    removeSanctuary (req, res)  {
        tryCatchResponce(res, () => {
            sanctuaryService.deleteSanctuary(req.body).then( ({errorMsg, sanctuaryLocation}) => {
                if (errorMsg) return res.json({errorMsg});
                res.json(sanctuaryLocation);
            });
        });
    }
};

module.exports = new SanctuaryController();