const CONSTANTS = {
    URL: 'https://marathon-api.clevertec.ru/',
    ROUTER__PATH: {
        AUTH__PATH: '/auth',
        MAIN__PATH: '/main',
        CHANGE_PASSWORD__PATH: '/change-password',
        FEEDBACKS__PATH: '/feedbacks',
        RESULT: {
            RESULT: '/result',
            SUCCESS: {
                SUCCESS__PATH: '/success',
                CHANGE_PASSWORD__PATH: '/success-change-password',
            },
            ERROR: {
                ERROR__PATH: '/error',
                USER_EXIT__PATH: '/error-user-exist',
                LOGIN__PATH: '/error-login',
                CHECK_EMAIL_NO_EXIST__PATH: '/error-check-email-no-exist',
                CHECK_EMAIL__PATH: '/error-check-email',
                CHANGE_PASSWORD__PATH: '/error-change-password',
            },
        },
    },
    CHECK_EMAIL_ERROR_MESSAGE: 'Email не найден',
    LOGIN_ERROR_MESSAGE: 'Неверные логин или пароль.',
    GET_FEEDBACKS_FAIL_MODAL: 'toggle feedbacks fail modal window',
    CREATE_FEEDBACK_MODAL: 'create feedback modal window',
    CREATE_FEEDBACK_SUCCESS_MODAL: 'create feedback success modal window',
    CREATE_FEEDBACK_ERROR_MODAL: 'create feedback error modal window',
    DEFAULT__FEEDBACKS_COUNT: 4,
    DATE_FORMAT: 'DD.MM.YYYY',
    RESULT_STATUS_TYPE_500: '500',
};

export default CONSTANTS;
