const { tryCatchResponce } = require("../utils/controller.utils.js");

class OtherController {
    notFound (_, res) {
        tryCatchResponce(res, () => res.sendStatus(404));
    }
};

module.exports = new OtherController();