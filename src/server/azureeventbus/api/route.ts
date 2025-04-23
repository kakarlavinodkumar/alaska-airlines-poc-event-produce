import express from "express";
import { SendFlightEventMessagePayload, SendFlightEventMessageResponse } from "../struct";
import { SendFlightEventMessage } from "../service/azureeventbusservice";
import { HTTP_RESPONSE_CODES } from "../../../appconstants/httpresponsecodes";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        // Payload
        const payload: SendFlightEventMessagePayload = req.body;

        // Service Call
        const response: SendFlightEventMessageResponse = await SendFlightEventMessage(payload);

        return res.status(HTTP_RESPONSE_CODES.SUCCESS).json(response);
    } catch (err: any) {
        res.status(err.code || 400).json({ message: err.message || "Error occurred while sending flight event message." });
    }
});

export default router;