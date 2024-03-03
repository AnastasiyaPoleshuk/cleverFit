/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useMemo, useState } from 'react';

import CONSTANTS from '../utils/constants';

export interface IAppContext {
    isFeedbacksFailModalOpen: boolean;
    isCreateFeedbackModalOpen: boolean;
    isCreateFeedbackErrorModalOpen: boolean;
    isCreateFeedbackSuccessModalOpen: boolean;
    openModal: (type: string) => void;
    closeModal: (type: string) => void;
}

export const AppContext = createContext<IAppContext>({
    isFeedbacksFailModalOpen: false,
    isCreateFeedbackModalOpen: false,
    isCreateFeedbackErrorModalOpen: false,
    isCreateFeedbackSuccessModalOpen: false,
    openModal: () => {},
    closeModal: () => {},
});

export const AppState = ({ children }: { children: React.ReactNode }) => {
    const [isFeedbacksFailModalOpen, setIsFeedbacksFailModalOpen] = useState(false);
    const [isCreateFeedbackModalOpen, setIsCreateFeedbackModalOpen] = useState(false);
    const [isCreateFeedbackErrorModalOpen, setIsCreateFeedbackErrorModalOpen] = useState(false);
    const [isCreateFeedbackSuccessModalOpen, setIsisCreateFeedbackSuccessModalOpen] =
        useState(false);

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
                setIsisCreateFeedbackSuccessModalOpen(true);
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
                setIsisCreateFeedbackSuccessModalOpen(false);
                break;
        }
    };

    const contextValue = useMemo(
        () => ({
            isFeedbacksFailModalOpen,
            isCreateFeedbackModalOpen,
            isCreateFeedbackErrorModalOpen,
            isCreateFeedbackSuccessModalOpen,
            openModal,
            closeModal,
        }),
        [
            isFeedbacksFailModalOpen,
            isCreateFeedbackModalOpen,
            isCreateFeedbackErrorModalOpen,
            isCreateFeedbackSuccessModalOpen,
        ],
    );

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
