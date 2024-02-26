import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice';
import changePasswordReducer from './slices/ChangePasswordSlice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 1,
});

export const store = configureStore({
    reducer: {
        router: routerReducer,
        user: userReducer,
        changePassword: changePasswordReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const history = createReduxHistory(store);
