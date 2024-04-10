import { IGetTrainingsResponse, IGetTrainingListResponse } from '../types/apiTypes';

export const findMostPopularWorkout = (
    trainings: IGetTrainingsResponse[],
    trainingsList: IGetTrainingListResponse[],
): string => {
    const loadPerTraining: { [key: string]: number } = {};

    for (const training of trainings) {
        let load = 0;
        for (const exercise of training.exercises) {
            load += exercise.replays * exercise.weight * exercise.approaches;
        }
        loadPerTraining[training.name] = load;
    }

    let maxLoad = 0;
    let mostPopularWorkout = '';

    for (const [name, load] of Object.entries(loadPerTraining)) {
        if (load > maxLoad) {
            maxLoad = load;
            mostPopularWorkout = name;
        }
    }

    const result = trainingsList.filter((item) => item.name === mostPopularWorkout);

    return result.length ? result[0].key : '';
};
