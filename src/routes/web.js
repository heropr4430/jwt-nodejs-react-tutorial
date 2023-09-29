import Express from "express";

const router = Express.Router();

/**
 * 
 * @param {*} app :express app
 */
const initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("Hello world");
    })

    return app.use("/", router);
}

export default initWebRoutes