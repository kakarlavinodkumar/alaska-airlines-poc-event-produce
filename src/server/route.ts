//Master routing file to route all the api's
import express from "express"
import azureEventBusRoutes from "./azureeventbus/api/route";

const router = express.Router();

//Authorization check for event api's
// app.use("/event", isAuthorized)
// routing for event api's
router.use("/azureeventbus", azureEventBusRoutes);
// router.use("/another_route", anotherRoute); 

export default router;