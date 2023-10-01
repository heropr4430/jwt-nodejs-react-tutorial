import Express from "express";
import homeController from "../controller/homeController"

const router = Express.Router();

/**
 * 
 * @param {*} app :express app
 */
const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWorld)
    router.get("/user", homeController.handleUserPage)

    return app.use("/", router);
}

export default initWebRoutes