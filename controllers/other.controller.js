import controllerUtils from "../utils/controller.utils.js";
const { tryCatchResponce } = controllerUtils;

const otherController = {
    notFound: (_, res) => tryCatchResponce(res, () => res.sendStatus(404))
};

export default otherController;