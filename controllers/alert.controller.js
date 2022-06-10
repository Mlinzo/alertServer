const alertService = require('../services/alert.service.js');

class AlertController{
    async getAlerts(req, res, next){
        try {   
            const alertLocations = await alertService.getAlerts();
            res.json({alertLocations});
        } catch (e) { next(e) }
    }
};

module.exports = new AlertController();
