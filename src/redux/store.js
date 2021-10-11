import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import sagaMiddlewareMain from 'redux-saga';
import eventSaga from './eventSagas';
import rootReducer from './rootReducer';



const sagaMiddleware = sagaMiddlewareMain();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(eventSaga);

export default store;
