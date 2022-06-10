const clientService = require('../services/client.service.js');

class ClientController {
    async login (req, res, next) {
       try {
            const clientInfo = await clientService.login(req.body);
            res.json(clientInfo);
        } catch (e) { next(e) }
    }

    async updateRegion (req, res, next) {
        try {
            const client = await clientService.updateClientRegion(req.client, req.body);
            res.json(client);
        } catch (e) { next(e) }   
    }

    async refresh (req, res, next) {
        try{
            const tokens = await clientService.refresh(req.client);
            res.json(tokens);
        } catch (e) { next(e) }
    }
};

module.exports = new ClientController();