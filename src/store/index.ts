import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import panelBuilderReducer from '../containers/PanelBuilder/reducer';
import authorizationReducer from '../containers/Authorization/reducer';

import watchAuthorization from '../containers/Authorization/sagas';

import { TOKEN_KEY } from '../containers/Authorization/constants';
import { getUserFromJwt } from '../containers/Authorization/services';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  panelBuilder: panelBuilderReducer,
  authorization: authorizationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const token = localStorage.getItem(TOKEN_KEY);
const initialState: Partial<RootState> = {
  authorization: {
    user: token ? getUserFromJwt(token) : null,
    isAuthInProgress: false,
  },
};

export const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(sagaMiddleware), composeWithDevTools())
);

sagaMiddleware.run(watchAuthorization);
