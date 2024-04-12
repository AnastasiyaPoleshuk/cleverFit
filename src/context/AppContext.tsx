/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useMemo, useState } from 'react';

import CONSTANTS from '../utils/constants';
import { ITrainingExercises } from '../types/storeTypes';
import {
    IGetInviteResponse,
    IGetTrainingPalsResponse,
    IGetTrainingsResponse,
} from '../types/apiTypes';

export type IAppContext = {
    isFeedbacksFailModalOpen: boolean;
    isCreateFeedbackModalOpen: boolean;
    isCreateFeedbackErrorModalOpen: boolean;
    isCreateFeedbackSuccessModalOpen: boolean;
    isRepeatRequestNeeded: boolean;
    isAddTrainingModalOpen: boolean;
    isDrawerOpen: boolean;
    isJoinTrainingDrawerOpen: boolean;
    isTariffDrawerOpen: boolean;
    isCreateTrainingDrawerOpen: boolean;
    isChangeTariffInfoModalOpen: boolean;
    isMyTrainingPartnerInfoModalOpen: boolean;
    isTrainingDetailsModalOpen: boolean;
    exercisesData: ITrainingExercises[];
    currentTraining: IGetTrainingsResponse;
    currentUserForJoinTraining: IGetTrainingPalsResponse;
    currentTrainingPartner: IGetTrainingPalsResponse;
    currentTrainingInvite: IGetInviteResponse;
    isCalendar: boolean;
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
    setJoinTrainingDrawerStatus: (state: boolean) => void;
    updateAddExercisesData: (data: { name: string; date: string }) => void;
    saveExercisesData: (exercisesData: ITrainingExercises[]) => void;
    saveCurrentExerciseName: (exerciseNam: string) => void;
    saveExercisesDataToUpdate: (data: { data: ITrainingExercises[]; id: string }) => void;
    saveRegistrationData: (data: { email: string; password: string }) => void;
    setCurrentTrainingData: (training: IGetTrainingsResponse) => void;
    setIsCalendar: (data: boolean) => void;
    saveCurrentUserForJoinTraining: (data: IGetTrainingPalsResponse) => void;
    saveCurrentTrainingPartner: (data: IGetTrainingPalsResponse) => void;
    saveCurrentTrainingInvite: (data: IGetInviteResponse) => void;
};

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
    isJoinTrainingDrawerOpen: false,
    isCreateTrainingDrawerOpen: false,
    isMyTrainingPartnerInfoModalOpen: false,
    isTrainingDetailsModalOpen: false,
    isCalendar: false,
    exercisesData: [],
    currentTraining: {
        _id: '',
        name: '',
        date: '',
        isImplementation: false,
        userId: '',
        parameters: {
            repeat: false,
            period: 0,
            jointTraining: false,
            participants: [],
        },
        exercises: [],
    },
    addExercisesData: {
        name: '',
        date: '',
    },
    registrationData: { email: '', password: '' },
    exercisesDataToUpdate: {
        data: [],
        id: '',
    },
    currentUserForJoinTraining: {
        id: '',
        name: '',
        trainingType: '',
        imageSrc: '',
        avgWeightInWeek: 0,
        inviteId: '',
        status: '',
    },
    currentTrainingPartner: {
        id: '',
        name: '',
        trainingType: '',
        imageSrc: '',
        avgWeightInWeek: 0,
        inviteId: '',
        status: '',
    },
    currentExerciseName: '',
    currentTrainingInvite: {
        _id: '',
        from: {
            _id: '',
            firstName: '',
            lastName: '',
            imageSrc: '',
        },
        training: {
            _id: '',
            name: '',
            date: '',
            isImplementation: false,
            userId: '',
            parameters: {
                repeat: false,
                period: 0,
                jointTraining: false,
                participants: [],
            },
            exercises: [],
        },
        status: '',
        createdAt: '',
    },
    openModal: () => {},
    closeModal: () => {},
    setStateOfRepeatRequest: () => {},
    updateAddExercisesData: () => {},
    saveExercisesData: () => {},
    saveCurrentExerciseName: () => {},
    saveExercisesDataToUpdate: () => {},
    setTariffDrawerStatus: () => {},
    saveRegistrationData: () => {},
    setCurrentTrainingData: () => {},
    setIsCalendar: () => {},
    setJoinTrainingDrawerStatus: () => {},
    saveCurrentUserForJoinTraining: () => {},
    saveCurrentTrainingPartner: () => {},
    saveCurrentTrainingInvite: () => {},
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
    const [isCreateTrainingDrawerOpen, setIsCreateTrainingDrawerOpen] = useState(false);
    const [isChangeTariffInfoModalOpen, setIsChangeTariffInfoModalOpen] = useState(false);
    const [isCalendar, setIsCalendarData] = useState(false);
    const [isMyTrainingPartnerInfoModalOpen, setIsMyTrainingPartnerInfoModalOpen] = useState(false);
    const [isJoinTrainingDrawerOpen, setIsJoinTrainingDrawerOpen] = useState(false);
    const [isTrainingDetailsModalOpen, setIsTrainingDetailsModalOpen] = useState(false);
    const [currentTraining, setCurrentTraining] = useState({});
    const [currentUserForJoinTraining, setCurrentUserForJoinTraining] = useState({});
    const [currentTrainingPartner, setCurrentTrainingPartner] = useState({});
    const [currentTrainingInvite, setCurrentTrainingInvite] = useState({});
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
            case CONSTANTS.CREATE_TRAINING_DRAWER:
                setIsCreateTrainingDrawerOpen(true);
                break;
            case CONSTANTS.MY_TRAINING_PARTNER_INFO_MODAL:
                setIsMyTrainingPartnerInfoModalOpen(true);
                break;
            case CONSTANTS.TRAINING_DETAILS_MODAL:
                setIsTrainingDetailsModalOpen(true);
                break;
            default:
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
            case CONSTANTS.CREATE_TRAINING_DRAWER:
                setIsCreateTrainingDrawerOpen(false);
                break;
            case CONSTANTS.MY_TRAINING_PARTNER_INFO_MODAL:
                setIsMyTrainingPartnerInfoModalOpen(false);
                break;
            case CONSTANTS.TRAINING_DETAILS_MODAL:
                setIsTrainingDetailsModalOpen(false);
                break;
            default:
                break;
        }
    };

    const saveRegistrationData = (data: { email: string; password: string }) => {
        setRegistrationData(data);
    };

    const saveCurrentTrainingInvite = (data: IGetInviteResponse) => {
        setCurrentTrainingInvite(data);
    };

    const setJoinTrainingDrawerStatus = (data: boolean) => {
        setIsJoinTrainingDrawerOpen(data);
    };

    const setIsCalendar = (data: boolean) => {
        setIsCalendarData(data);
    };

    const saveCurrentUserForJoinTraining = (data: IGetTrainingPalsResponse) => {
        setCurrentUserForJoinTraining(data);
    };

    const saveCurrentTrainingPartner = (data: IGetTrainingPalsResponse) => {
        setCurrentTrainingPartner(data);
    };

    const setCurrentTrainingData = (training: IGetTrainingsResponse) => {
        setCurrentTraining(training);
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
            isCreateTrainingDrawerOpen,
            registrationData,
            currentTraining,
            isCalendar,
            isJoinTrainingDrawerOpen,
            currentUserForJoinTraining,
            isMyTrainingPartnerInfoModalOpen,
            currentTrainingPartner,
            isTrainingDetailsModalOpen,
            currentTrainingInvite,
            openModal,
            closeModal,
            setStateOfRepeatRequest,
            updateAddExercisesData,
            saveExercisesData,
            saveCurrentExerciseName,
            saveExercisesDataToUpdate,
            setTariffDrawerStatus,
            saveRegistrationData,
            setCurrentTrainingData,
            setIsCalendar,
            setJoinTrainingDrawerStatus,
            saveCurrentUserForJoinTraining,
            saveCurrentTrainingPartner,
            saveCurrentTrainingInvite,
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
            isCreateTrainingDrawerOpen,
            currentTraining,
            isCalendar,
            isJoinTrainingDrawerOpen,
            currentUserForJoinTraining,
            isMyTrainingPartnerInfoModalOpen,
            currentTrainingPartner,
            isTrainingDetailsModalOpen,
            currentTrainingInvite,
        ],
    );

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
