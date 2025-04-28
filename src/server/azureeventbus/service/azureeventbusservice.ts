import { config } from "../../../config/config";
import { SendFlightEventMessagePayload, SendFlightEventMessageResponse } from "../struct";

const { ServiceBusClient } = require("@azure/service-bus");

const connectionString = config.AZURE_BUS_CONNECTION_STRING;
const topicName = "flightevents"; 

// Send Flight Event message
export const SendFlightEventMessage = async (payload: SendFlightEventMessagePayload): Promise<SendFlightEventMessageResponse>=> {
    // Payload
    const { flight_number, departure_from, arrival_to, local_departure_date_time, local_arrival_date_time, event_name, event_type, event_time } = payload;

    // Payload Validation
    if(!flight_number || !departure_from || !arrival_to || !local_departure_date_time || !local_arrival_date_time || !event_name || !event_type || !event_time) {
        throw new Error("All fields are required");
    }

    // Business Logic
    const sbClient = new ServiceBusClient(connectionString);
    const sender = sbClient.createSender(topicName);

    try {
        const message = {
            body: {
                flight_number: flight_number,
                departure_from: departure_from,
                arrival_to: arrival_to,
                local_departure_date_time: local_departure_date_time,
                local_arrival_date_time: local_arrival_date_time,
                event_type: event_type,
                event_name: event_name,
                event_time: event_time
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