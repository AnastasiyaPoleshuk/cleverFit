import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store, history } from '@redux/configure-store';

import 'normalize.css';
import './index.scss';
import { App } from './App';
import { HistoryRouter } from 'redux-first-history/rr6';
import { HashRouter } from 'react-router-dom';
import { AppState } from './context/AppContext';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <Provider store={store}>
        <AppState>
            <HistoryRouter history={history}>
                <App />
            </HistoryRouter>
        </AppState>
    </Provider>,
);
