import { RootState } from '@redux/configure-store';

export const UserSelector = (state: RootState) => state.user;
export const calendarSelector = (state: RootState) => state.calendar;
export const changePasswordSelector = (state: RootState) => state.changePassword;
export const feedbacksSelector = (state: RootState) => state.feedbacks;
export const routerSelector = (state: RootState) => state.router;
