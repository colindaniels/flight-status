export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event) as { flight_number: string };
        const flight_number = query.flight_number;

        await new Promise(res => setTimeout(res, 3000));

        const flight_data = {
            departure: 'ORD',
            destination: 'LAX',
            flight_number: flight_number,
            departure_time: '05:26 PM',
            status: '5 MIN LATE'
        }

        return flight_data
    } catch (err) {
        console.error(err);
        return 'error';
    }
});