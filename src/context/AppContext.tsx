/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useMemo, useState } from 'react';

import CONSTANTS from '../utils/constants';
import { ITrainingExercises } from '../types/storeTypes';

export interface IAppContext {
    isFeedbacksFailModalOpen: boolean;
    isCreateFeedbackModalOpen: boolean;
    isCreateFeedbackErrorModalOpen: boolean;
    isCreateFeedbackSuccessModalOpen: boolean;
    isRepeatRequestNeeded: boolean;
    isAddTrainingModalOpen: boolean;
    isDrawerOpen: boolean;
    isTariffDrawerOpen: boolean;
    isChangeTariffInfoModalOpen: boolean;
    exercisesData: ITrainingExercises[];
    addExercisesData: {
        name: string;
        date: string;
    };
    registrationData: { email: string; password: string };
    exercisesDataToUpdate: {
        data: ITrainingExercises[];
        id: string;
    };
    currentExerciseName: string;
    openModal: (type: string) => void;
    closeModal: (type: string) => void;
    setStateOfRepeatRequest: (state: boolean) => void;
    setTariffDrawerStatus: (state: boolean) => void;
    updateAddExercisesData: (data: { name: string; date: string }) => void;
    saveExercisesData: (exercisesData: ITrainingExercises[]) => void;
    saveCurrentExerciseName: (exerciseNam: string) => void;
    saveExercisesDataToUpdate: (data: { data: ITrainingExercises[]; id: string }) => void;
    saveRegistrationData: (data: { email: string; password: string }) => void;
}

export const AppContext = createContext<IAppContext>({
    isFeedbacksFailModalOpen: false,
    isCreateFeedbackModalOpen: false,
    isCreateFeedbackErrorModalOpen: false,
    isCreateFeedbackSuccessModalOpen: false,
    isRepeatRequestNeeded: false,
    isAddTrainingModalOpen: false,
    isDrawerOpen: false,
    isChangeTariffInfoModalOpen: false,
    isTariffDrawerOpen: false,
    exercisesData: [],
    addExercisesData: {
        name: '',
        date: '',
    },
    registrationData: { email: '', password: '' },
    exercisesDataToUpdate: {
        data: [],
        id: '',
    },
    currentExerciseName: '',
    openModal: () => {},
    closeModal: () => {},
    setStateOfRepeatRequest: () => {},
    updateAddExercisesData: () => {},
    saveExercisesData: () => {},
    saveCurrentExerciseName: () => {},
    saveExercisesDataToUpdate: () => {},
    setTariffDrawerStatus: () => {},
    saveRegistrationData: () => {},
});

export const AppState = ({ children }: { children: React.ReactNode }) => {
    const [isFeedbacksFailModalOpen, setIsFeedbacksFailModalOpen] = useState(false);
    const [isCreateFeedbackModalOpen, setIsCreateFeedbackModalOpen] = useState(false);
    const [isCreateFeedbackErrorModalOpen, setIsCreateFeedbackErrorModalOpen] = useState(false);
    const [isCreateFeedbackSuccessModalOpen, setIsCreateFeedbackSuccessModalOpen] = useState(false);
    const [isRepeatRequestNeeded, setIsRepeatRequestNeeded] = useState(false);
    const [isAddTrainingModalOpen, setIsAddTrainingModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isTariffDrawerOpen, setIsTariffDrawerOpen] = useState(false);
    const [isChangeTariffInfoModalOpen, setIsChangeTariffInfoModalOpen] = useState(false);
    const [registrationData, setRegistrationData] = useState({ email: '', password: '' });
    const [addExercisesData, setAddExercisesData] = useState({
        name: '',
        date: '',
    });
    const [currentExerciseName, setCurrentExerciseName] = useState('');
    const [exercisesData, setExercisesData] = useState<ITrainingExercises[]>([]);
    const [exercisesDataToUpdate, setExercisesDataToUpdate] = useState<{
        data: ITrainingExercises[];
        id: string;
    }>([]);

    const openModal = (type: string) => {
        window.scrollTo({ top: 0 });

        switch (type) {
            case CONSTANTS.GET_FEEDBACKS_FAIL_MODAL:
                setIsFeedbacksFailModalOpen(true);
                break;
            case CONSTANTS.CREATE_FEEDBACK_MODAL:
                setIsCreateFeedbackModalOpen(true);
                break;
            case CONSTANTS.CREATE_FEEDBACK_ERROR_MODAL:
                setIsCreateFeedbackErrorModalOpen(true);
                break;
            case CONSTANTS.CREATE_FEEDBACK_SUCCESS_MODAL:
                setIsCreateFeedbackSuccessModalOpen(true);
                break;
            case CONSTANTS.ADD_TRAINING_MODAL:
                setIsAddTrainingModalOpen(true);
                break;
            case CONSTANTS.DRAWER:
                setIsDrawerOpen(true);
                break;
            case CONSTANTS.CHANGE_TARIFF_INFO_MODAL:
                setIsChangeTariffInfoModalOpen(true);
                break;
        }
    };

    const closeModal = (type: string) => {
        switch (type) {
            case CONSTANTS.GET_FEEDBACKS_FAIL_MODAL:
                setIsFeedbacksFailModalOpen(false);
                break;
            case CONSTANTS.CREATE_FEEDBACK_MODAL:
                setIsCreateFeedbackModalOpen(false);
                break;
            case CONSTANTS.CREATE_FEEDBACK_ERROR_MODAL:
                setIsCreateFeedbackErrorModalOpen(false);
                break;
            case CONSTANTS.CREATE_FEEDBACK_SUCCESS_MODAL:
                setIsCreateFeedbackSuccessModalOpen(false);
                break;
            case CONSTANTS.ADD_TRAINING_MODAL:
                setIsAddTrainingModalOpen(false);
                break;
            case CONSTANTS.DRAWER:
                setIsDrawerOpen(false);
                break;
            case CONSTANTS.CHANGE_TARIFF_INFO_MODAL:
                setIsChangeTariffInfoModalOpen(false);
                break;
        }
    };

    const saveRegistrationData = (data: { email: string; password: string }) => {
        setRegistrationData(data);
    };

    const setStateOfRepeatRequest = (state: boolean) => {
        setIsRepeatRequestNeeded(state);
    };

    const saveExercisesData = (data: ITrainingExercises[]) => {
        setExercisesData(data);
    };

    const saveExercisesDataToUpdate = (data: { data: ITrainingExercises[]; id: string }) => {
        setExercisesDataToUpdate(data);
    };

    const updateAddExercisesData = (data: { name: string; date: string }) => {
        setAddExercisesData(data);
    };

    const saveCurrentExerciseName = (name: string) => {
        setCurrentExerciseName(name);
    };

    const setTariffDrawerStatus = (status: boolean) => {
        setIsTariffDrawerOpen(status);
    };

    const contextValue = useMemo(
        () => ({
            isFeedbacksFailModalOpen,
            isCreateFeedbackModalOpen,
            isCreateFeedbackErrorModalOpen,
            isCreateFeedbackSuccessModalOpen,
            isRepeatRequestNeeded,
            isAddTrainingModalOpen,
            addExercisesData,
            exercisesData,
            currentExerciseName,
            isDrawerOpen,
            exercisesDataToUpdate,
            isTariffDrawerOpen,
            isChangeTariffInfoModalOpen,
            registrationData,
            openModal,
            closeModal,
            setStateOfRepeatRequest,
            updateAddExercisesData,
            saveExercisesData,
            saveCurrentExerciseName,
            saveExercisesDataToUpdate,
            setTariffDrawerStatus,
            saveRegistrationData,
        }),
        [
            isFeedbacksFailModalOpen,
            isCreateFeedbackModalOpen,
            isCreateFeedbackErrorModalOpen,
            isCreateFeedbackSuccessModalOpen,
            isRepeatRequestNeeded,
            isAddTrainingModalOpen,
            addExercisesData,
            isDrawerOpen,
            exercisesData,
            currentExerciseName,
            exercisesDataToUpdate,
            isTariffDrawerOpen,
            isChangeTariffInfoModalOpen,
            registrationData,
        ],
    );

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
