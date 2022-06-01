const alertService = require('../services/alert.service.js');

class AlertController{
    async getAlerts(req, res, next){
        try {   
            const alertLocations = await alertService.getAlerts();
            res.json({alertLocations});
        } catch (e) { next(e) }
    }

    async addAlert(req, res, next){
        try {
            const alertLocation = await alertService.addAlert(req.body);
            res.json(alertLocation);
        } catch (e) { next(e) }
    }

    async removeAlert(req, res, next){
        try {
            const alertLocation = await alertService.deleteAlert(req.body);
            res.json(alertLocation);
        } catch (e) { next(e) }
    }

    async changeAlert(req, res, next) {
        try {
            const alertLocation = await alertService.updateAlert(req.body);
            res.json(alertLocation);
        } catch (e) { next(e) }
    }
};

module.exports = new AlertController();
