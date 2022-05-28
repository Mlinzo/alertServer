const clientService = require('../services/client.service.js');

class ClientController {
    async login (req, res, next) {
       try {
            const clientInfo = await clientService.login(req.body);
            res.json(clientInfo);
        } catch (e) { next(e) }
    }

    async updateOnline (req, res, next) {
        try {
            const client = await clientService.online(req.client);
            res.json(client);
        } catch (e) { next(e) }
    }
    
    async clients (req, res, next) {
        try {
            const clients = await clientService.getClients();
            res.json({clients});
        } catch (e) { next(e) }   
    }

    async updateRegion (req, res, next) {
        try {
            const client = await clientService.updateClientRegion(req.client, req.body);
            res.json(client);
        } catch (e) { next(e) }   
    }

    async removeClient (req, res, next)  {
        try {
            const client = await clientService.deleteClient(req.body);
            res.json(client);
        } catch (e) { next(e) }
    }

    async refresh (req, res, next) {
        try{
            const tokens = await clientService.refresh(req.body);
            res.json(tokens);
        } catch (e) { next(e) }
    }
};

module.exports = new ClientController();