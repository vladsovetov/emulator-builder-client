import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import panelBuilderReducer from '../containers/PanelBuilder/reducer';
import authorizationReducer from '../containers/Authorization/reducer';

import watchAuthorization from '../containers/Authorization/sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  panelBuilderReducer,
  authorizationReducer,
});

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware), composeWithDevTools())
);

sagaMiddleware.run(watchAuthorization);

export type RootState = ReturnType<typeof rootReducer>;
