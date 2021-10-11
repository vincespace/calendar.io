import * as type from './actionTypes';

export const loadEventsStart = () => ({
  type: type.LOAD_EVENTS_START,
});

export const loadEventsSuccess = (events) => ({
  type: type.LOAD_EVENTS_SUCCESS,
  payload: events,
});

export const loadEventsError = (error) => ({
  type: type.LOAD_EVENTS_ERROR,
  payload: error,
});

export const createEventStart = (event) => ({
  type: type.CREATE_EVENT_START,
  payload: event,
});

export const createEventSuccess = () => ({
  type: type.CREATE_EVENT_SUCCESS,
});

export const createEventError = (error) => ({
  type: type.CREATE_EVENT_ERROR,
  payload: error,
});

export const deleteEventStart = (eventInfo) => ({
  type: type.DELETE_EVENT_START,
  payload: eventInfo,
});

export const deleteEventSuccess = (eventInfo) => ({
  type: type.DELETE_EVENT_SUCCESS,
  payload: eventInfo,
});

export const deleteEventError = (error) => ({
  type: type.DELETE_EVENT_ERROR,
  payload: error,
});

export const updateEventStart = (eventInfo) => ({
  type: type.UPDATE_EVENT_START,
  payload: eventInfo,
});

export const updateEventSuccess = () => ({
  type: type.UPDATE_EVENT_SUCCESS,
});

export const updateEventError = (error) => ({
  type: type.UPDATE_EVENT_ERROR,
  payload: error,
});


export const searchEventStart = (query, field) => ({
  type: type.SEARCH_EVENT_START,
  payload: {query, field}
})

export const searchEventSuccess = (events) => ({
  type: type.SEARCH_EVENT_SUCCESS,
  payload: events,
});

export const searchEventError = (error) => ({
  type: type.SEARCH_EVENT_ERROR,
  payload: error,
});