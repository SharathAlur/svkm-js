import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import bookings from './bookings';

const mock = new MockAdapter(axios);
mock.onGet('/bookings').reply(200, bookings)