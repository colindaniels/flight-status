import axios from 'axios';
import { load } from 'cheerio'

interface FlightData {
    departure: string,
    destination: string,
    flight_number: string,
    departure_time: string,
    status: string
}


export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event) as { flight_number: string };
        const flight_number = query.flight_number;

        const flight_data = await scrapeFlightAware(flight_number)
    } catch (err) {
        console.error(err);
        return 'error';
    }
});


async function scrapeFlightAware(flight_number: string): Promise<FlightData | void> {
    const response = await axios.get(`https://www.flightaware.com/live/flight/UAL237`, {
        headers: {
            'User-Agent': 'PostmanRuntime/7.43.0'
        }
    })

    const html: string = response.data;

    const $ = load(html);

    const flightSummary = $('.flightPageSummaryCity').html()
    console.log(flightSummary)

}