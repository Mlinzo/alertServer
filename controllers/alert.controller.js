const alertService = require('../services/alert.service.js');
const {tryCatchResponce} = require('../utils/controller.utils.js');

class AlertController{
    getAlerts(_, res){
        tryCatchResponce( res, () => {
            alertService.getAlerts().then( ({ errorMsg, alertLocations }) => {
                if (errorMsg) return res.status(400).json({errorMsg});;
                res.json({alertLocations});    
            });
        });
    }

    async addAlert(req, res){
        tryCatchResponce(res, () => {
            alertService.insertAlert(req.body).then( ({errorMsg, alertLocation}) => {
                if (errorMsg) return res.status(400).json({errorMsg});
                res.json(alertLocation);
            });
        });
    }

    removeAlert(req, res){
        tryCatchResponce(res, () => {
            alertService.deleteAlert(req.body).then( ({errorMsg, alertLocation}) => {
                if (errorMsg) return res.status(400).json({errorMsg});
                res.json(alertLocation);
            });
        });
    }

    changeAlert(req, res) {
        tryCatchResponce(res, () => {
            alertService.updateAlert(req.body).then( ({errorMsg, alertLocation}) => {
                if (errorMsg) return res.status(400).json({errorMsg});
                res.json(alertLocation);
            });
        });
    }
};

module.exports = new AlertController();
