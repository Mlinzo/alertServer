const sanctuaryService = require('../services/sanctuary.service.js');

class SanctuaryController {
    async getSanctuaries (req, res, next) {
        try {
            const sanctuaries = await sanctuaryService.getSanctuaries();
            res.json({sanctuaries});
        } catch (e) { next(e) }
    }

    async addSanctuary (req, res, next) {
        try {
            const sanctuary = await sanctuaryService.insertSanctuary(req.body);
            res.json(sanctuary);
        } catch (e) { next(e) }
    }

    async removeSanctuary (req, res, next) {
        try {
            const sanctuary = await sanctuaryService.deleteSanctuary(req.body);
            res.json(sanctuary);
        } catch (e) { next(e) }
    }
};

module.exports = new SanctuaryController();