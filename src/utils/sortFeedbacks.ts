import { IFeedbacks } from '../types/apiTypes';

export const sortFeedbacks = (data: IFeedbacks[]) => {
    const arr = [...data];
    return arr.sort((a: IFeedbacks, b: IFeedbacks) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateB.getTime() - dateA.getTime();
    });
};
