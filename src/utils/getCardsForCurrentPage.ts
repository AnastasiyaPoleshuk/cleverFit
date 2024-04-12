import { IGetTrainingPalsResponse } from '../types/apiTypes';
import CONSTANTS from './constants';

export const getCardsForCurrentPage = (cardsArr: IGetTrainingPalsResponse[], page: number) => {
    return [...cardsArr].slice(page - 1, CONSTANTS.PAGINATION_PAGE_SIZE_DEFAULT);
};
