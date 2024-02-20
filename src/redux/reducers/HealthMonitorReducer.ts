import { HEALTH_MONITOR } from '../actionTypes';

interface IAction {
    type: string;
    payload?: any;
}

export const HealthMonitorReducer = (state = { isHealth: false }, action: IAction) => {
    switch (action.type) {
        case HEALTH_MONITOR:
            return { ...state, isHealth: action.payload };
        default:
            return state;
    }
};
