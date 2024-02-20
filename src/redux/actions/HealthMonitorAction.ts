import { HEALTH_MONITOR } from '../actionTypes';

export const HealthMonitorAction = (payload: boolean) => ({ type: HEALTH_MONITOR, payload });
