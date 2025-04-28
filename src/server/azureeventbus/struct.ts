export interface SendFlightEventMessagePayload {
    flight_number: string
    departure_from: string
    arrival_to: string
    local_departure_date: string
    local_departure_time: string
    local_arrival_date: string
    local_arrival_time: string
    event_name: string
    event_type: string
}

export interface SendFlightEventMessageResponse {
    message: string
}