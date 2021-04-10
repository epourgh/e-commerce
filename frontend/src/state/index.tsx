import { store } from './store';
import * as ActionCreators from './action-creators/index';
import Reducers, { RootState } from './reducers/index';

export const storeExport = store;
export const ActionCreatorsExport = ActionCreators;
export const ReducersExport = Reducers;
export type RootStateExport = RootState;