const clientService = require('../services/client.service.js');
const {tryCatchResponce} = require('../utils/controller.utils.js');

class ClientController {
    login (req, res) {
        tryCatchResponce(res, () => {
            clientService.register(req.body).then( (token) => {
                res.json({token});
            });         
        });
    }

    updateOnline (req, res) {
        tryCatchResponce(res, () => {
            clientService.online(req.client).then( ({errorMsg, client}) => {
                if (errorMsg) return res.status(400).json({errorMsg});
                res.json(client);
            });         
        });
    }
    
    clients (_, res) {
        tryCatchResponce(res, () => {
            clientService.getClients().then( ({ errorMsg, clients }) => {
                if (errorMsg) return res.status(400).json({errorMsg});
                res.json({clients});    
            });
        });   
    }

    updateRegion (req, res) {
        tryCatchResponce(res, () => {
            clientService.updateClientRegion(req.client, req.body).then(({ errorMsg, client }) => {
                if (errorMsg) return res.status(400).json({errorMsg});
                res.json(client);
            });
        });   
    }

    removeClient (req, res)  {
        tryCatchResponce(res, () => {
            clientService.deleteClient(req.body).then( ({errorMsg, client}) => {
                if (errorMsg) return res.status(400).json({errorMsg});
                res.json(client);
            });
        });
    }
};

module.exports = new ClientController();