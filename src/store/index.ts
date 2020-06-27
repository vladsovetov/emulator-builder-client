import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import panelBuilderReducer from '../containers/PanelBuilder/reducer';

const rootReducer = combineReducers({
  panelBuilderReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof rootReducer>;
