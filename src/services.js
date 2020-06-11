import axios from 'axios';

export const getBookings = () => (
    axios.get('/bookings').then(response => response.data)
);