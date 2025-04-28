export interface SendFlightEventMessagePayload {
    flight_number: string
    departure_from: string
    arrival_to: string
    local_departure_date_time: string
    local_arrival_date_time: string
    event_type: string
    event_name: string
    event_time: string
}

export interface SendFlightEventMessageResponse {
    message: string
}