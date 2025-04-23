import { config } from "../../../config/config";
import { SendFlightEventMessagePayload, SendFlightEventMessageResponse } from "../struct";

const { ServiceBusClient } = require("@azure/service-bus");

const connectionString = config.AZURE_BUS_CONNECTION_STRING;
const topicName = "flightevents"; 

// Send Flight Event message
export const SendFlightEventMessage = async (payload: SendFlightEventMessagePayload): Promise<SendFlightEventMessageResponse>=> {
    // Payload
    const { flight_id, status, reason, event_name, event_type } = payload;

    // Payload Validation
    if(!flight_id || !status || !reason || !event_name || !event_type) {
        throw new Error("All fields are required");
    }

    // Business Logic
    const sbClient = new ServiceBusClient(connectionString);
    const sender = sbClient.createSender(topicName);

    try {
        const message = {
            body: {
                flight_id: flight_id,
                status: status,
                reason: reason,
                event_name: event_name,
                event_type: event_type
            },
            contentType: "application/json",
            label: "FlightEvent",
        };

        await sender.sendMessages(message);
    } catch (err: any) {
        throw err;
    } finally {
        await sender.close();
        await sbClient.close();
    }

    // Response
    return {
        message: "Flight Event published successfully."
    };
}