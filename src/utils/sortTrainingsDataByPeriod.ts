import { IGetTrainingsResponse } from '@types/apiTypes';

export const sortTrainingsDataByPeriod = (
    data: IGetTrainingsResponse[],
    direction: sortDirection | sortDirection.Asc,
) => {
    return [...data].slice().sort((a, b) => {
        const aValue =
            a.parameters.repeat === true && a.parameters.period ? a.parameters.period : 0;
        const bValue =
            b.parameters.repeat === true && b.parameters.period ? b.parameters.period : 0;
        return direction == sortDirection.Asc ? aValue - bValue : bValue - aValue;
    });
};

export enum sortDirection {
    Asc,
    Desc,
}
