export interface SendFlightEventMessagePayload {
    flight_id: string
    status: string
    reason: string
    event_name: string
    event_type: string
}

export interface SendFlightEventMessageResponse {
    message: string
}