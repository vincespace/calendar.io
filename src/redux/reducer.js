import * as type from './actionTypes';

const initialState = {
  events: [],
  loading: false,
  error: null,
  eventUpdateLoading: false,
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.LOAD_EVENTS_START:
    case type.CREATE_EVENT_START:
    case type.DELETE_EVENT_START:
      return {
        ...state,
        loading: true,
      };
    case type.UPDATE_EVENT_START:
      return {
        ...state,
        loading: true,
        eventUpdateLoading: true,
      };
    case type.LOAD_EVENTS_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        events: action.payload,
      };
    case type.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case type.UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        eventUpdateLoading: false,
      };
    case type.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        events: state.events.filter((event) => event.id !== action.payload),
      };

    case type.LOAD_EVENTS_ERROR:
    case type.CREATE_EVENT_ERROR:
    case type.DELETE_EVENT_ERROR:
    case type.UPDATE_EVENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        eventUpdateLoading: false,
      };
    case type.UPDATE_EVENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case type.SEARCH_EVENT_SUCCESS:
      return {
        ...state,
        events: action.payload,
      };
    default:
      return state;
  }
};

export default eventsReducer;
