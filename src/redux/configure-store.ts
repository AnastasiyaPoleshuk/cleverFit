import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { UserReducer } from './reducers/UserReducer';
import { configureStore } from '@reduxjs/toolkit';
import { LoadingReducer } from './reducers/LoadingReducer';
import { ErrorReducer } from './reducers/ErrorReducer';
import { HealthMonitorReducer } from './reducers/HealthMonitorReducer';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

export const store = configureStore({
    reducer: {
        router: routerReducer,
        user: UserReducer,
        isLoading: LoadingReducer,
        error: ErrorReducer,
        isHealth: HealthMonitorReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const history = createReduxHistory(store);
