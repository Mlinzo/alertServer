const controllerUtils = {
    tryCatchResponce: (res, func)  => {
        try { func() } 
        catch (e) { console.log(e); res.sendStatus(400) }
    }  
};

export default controllerUtils;