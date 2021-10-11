import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from 'redux-saga/effects';

import * as type from './actionTypes';

import {
  loadEventsError,
  loadEventsSuccess,
  createEventError,
  createEventSuccess,
  deleteEventError,
  deleteEventSuccess,
  updateEventSuccess,
  updateEventError,
  searchEventSuccess,
  searchEventError,
} from './actions';

import {
  searchEventApi,
  eventsListApi,
  createEventApi,
  removeEventApi,
  updateEventApi,
} from '../api/calendarEventsApi';

function* onLoadEventsStartAsync() {
  try {
    const res = yield call(eventsListApi);
    if (res.status === 200) {
      yield delay(500);
      yield put(loadEventsSuccess(res.data));
    }
  } catch (err) {
    yield put(loadEventsError(err.res.data));
  }
}

function* onSearchEventStartAsync({ query, field }) {
  if (query && field) {
    try {
      const res = yield call(searchEventApi, query, field);
      yield put(searchEventSuccess(res.data));
    } catch (err) {
      console.log(err)
      yield put(searchEventError(err));
    }
  } else {
    try {
      const res = yield call(eventsListApi);
      if (res.status === 200) {
        yield delay(500);
        yield put(loadEventsSuccess(res.data));
      }
    } catch (err) {
      yield put(loadEventsError(err.res.data));
    }
  }
}

function* onCreateEventStartAsync({ payload }) {
  try {
    const res = yield call(createEventApi, payload);
    if (res.status === 201) {
      yield put(createEventSuccess(res.data));
    }
  } catch (err) {
    yield put(createEventError(err.res.data));
  }
}

function* onDeleteEventStartAsync(event_id) {
  try {
    const res = yield call(removeEventApi, event_id);
    if (res.status === 200) {
      yield delay(500);
      yield put(deleteEventSuccess(event_id));
    }
  } catch (err) {
    yield put(deleteEventError(err.res.data));
  }
}

function* onUpdateEventStartAsync({ payload: { id, formValue } }) {
  try {
    const res = yield call(updateEventApi, id, formValue);
    if (res.status === 200) {
      yield put(updateEventSuccess());
    }
  } catch (err) {
    yield put(updateEventError(err.res.data));
  }
}

function* onUpdateEvent() {
  yield takeLatest(type.UPDATE_EVENT_START, onUpdateEventStartAsync);
}

function* onSearchEvent() {
  while (true) {
    const { payload } = yield take(type.SEARCH_EVENT_START);
    yield call(onSearchEventStartAsync, payload);
  }
}

function* onCreateEvent() {
  yield takeLatest(type.CREATE_EVENT_START, onCreateEventStartAsync);
}

function* onDeleteEvent() {
  while (true) {
    const { payload: event_id } = yield take(type.DELETE_EVENT_START);
    yield call(onDeleteEventStartAsync, event_id);
  }
}

function* onLoadEvents() {
  yield takeEvery(type.LOAD_EVENTS_START, onLoadEventsStartAsync);
}

const eventsSagas = [
  fork(onSearchEvent),
  fork(onLoadEvents),
  fork(onCreateEvent),
  fork(onDeleteEvent),
  fork(onUpdateEvent),
];

export default function* eventSaga() {
  yield all([...eventsSagas]);
}
