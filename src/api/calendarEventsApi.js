import axios from 'axios';
import store from '../redux/store';

export const eventsListApi = async () =>
  await axios.get('http://localhost:2001/events');

export const createEventApi = async (event) =>
  await axios.post('http://localhost:2001/events', event);

export const updateEventApi = async (event_id, event_info) =>
  await axios.put(`http://localhost:2001/events/${event_id}`, event_info);

export const removeEventApi = async (event_id) =>
  await axios.delete(`http://localhost:2001/events/${event_id}`);

export const searchEventApi = async (search, field) => {
  if (field === 'status') {
    return await axios.get(
      `http://localhost:2001/events/?${field}_like=${`^${search}$`}`
    );
  }
  return await axios.get(
    `http://localhost:2001/events/?${field}_like=${search}`
  );
};
