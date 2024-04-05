import CONSTANTS from './constants';

export const getTrainingColor = (key: string) => {
    switch (key) {
        case CONSTANTS.TRAINING_TYPE.BACK:
            return CONSTANTS.TRAINING_COLOR.BACK;
        case CONSTANTS.TRAINING_TYPE.CHEST:
            return CONSTANTS.TRAINING_COLOR.CHEST;
        case CONSTANTS.TRAINING_TYPE.HANDS:
            return CONSTANTS.TRAINING_COLOR.HANDS;
        case CONSTANTS.TRAINING_TYPE.LEGS:
            return CONSTANTS.TRAINING_COLOR.LEGS;
        case CONSTANTS.TRAINING_TYPE.STRENGTH:
            return CONSTANTS.TRAINING_COLOR.STRENGTH;
        default:
            break;
    }
};
