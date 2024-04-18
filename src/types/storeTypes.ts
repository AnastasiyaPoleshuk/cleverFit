export type ITrainingParameters = {
    repeat: boolean;
    period: number;
    jointTraining: boolean;
    participants: string[];
};

export type ITrainingExercises = {
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
};

export type ISenderInviteData = {
    _id: string;
    firstName?: string;
    lastName?: string;
    imageSrc?: string;
};

export type IStatisticDataWeek = {
    id: string;
    weekDay: string;
    weight: number;
};
