import { IS_LOADING } from '../actionTypes';

export const LoadingAction = (payload: boolean) => ({ type: IS_LOADING, payload });
