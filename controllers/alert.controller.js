import alertService from '../services/alert.service.js'
import controllerUtils from '../utils/controller.utils.js';
const {tryCatchResponce} = controllerUtils;
const {insertAlert, deleteAlert, getAlerts, updateAlert} = alertService;

const alertController = {
    getAlerts: (_, res) => {
        tryCatchResponce( res, () => {
            getAlerts().then( ({ errorMsg, alertLocations }) => {
                if (errorMsg) return res.status(400).json({errorMsg});;
                res.json({alertLocations});    
            });
        });
    },

    addAlert: (req, res) => {
        tryCatchResponce(res, () => {
            insertAlert(req.body).then( ({errorMsg, alertLocation}) => {
                if (errorMsg) return res.status(400).json({errorMsg});
                res.json(alertLocation);
            });
        });
    },

    removeAlert: (req, res) => {
        tryCatchResponce(res, () => {
            deleteAlert(req.body).then( ({errorMsg, alertLocation}) => {
                if (errorMsg) return res.status(400).json({errorMsg});
                res.json(alertLocation);
            });
        });
    },

    changeAlert: (req, res) => {
        tryCatchResponce(res, () => {
            updateAlert(req.body).then( ({errorMsg, alertLocation}) => {
                if (errorMsg) return res.status(400).json({errorMsg});
                res.json(alertLocation);
            });
        });
    }
};

export default alertController;
