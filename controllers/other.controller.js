class OtherController {
    notFound (req, res, next) {
        try{
            res.sendStatus(404);
        } catch (e) { next(e) }
    }
};

module.exports = new OtherController();