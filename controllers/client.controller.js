import controllerUtils from '../utils/controller.utils.js';
import clientService from '../services/client.service.js';

const {tryCatchResponce} = controllerUtils;
const {register, getClients, updateClientRegion, deleteClient} = clientService;

const clientController = {
    login: (req, res) => {
        tryCatchResponce(res, () => {
            register(req.body).then( (token) => {
                res.json({token});
            });         
        });
    },
    
    clients: (_, res) => {
        tryCatchResponce(res, () => {
            getClients().then( ({ errorMsg, clients }) => {
                if (errorMsg) return res.status(400).json({errorMsg});
                res.json({clients});    
            });
        });   
    },

    updateRegion: (req, res) => {
        tryCatchResponce(res, () => {
            updateClientRegion(req.client, req.body).then(({ errorMsg, client }) => {
                if (errorMsg) return res.status(400).json({errorMsg});
                res.json(client);
            });
        });   
    },

    removeClient: (req, res) => {
        tryCatchResponce(res, () => {
            deleteClient(req.body).then( ({errorMsg, client}) => {
                if (errorMsg) return res.status(400).json({errorMsg});
                res.json(client);
            });
        });
    }
};

export default clientController;