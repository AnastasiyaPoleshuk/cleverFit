export interface ITrainingParameters {
    repeat: boolean;
    period: number;
    jointTraining: boolean;
    participants: string[];
}

export interface ITrainingExercises {
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
}
