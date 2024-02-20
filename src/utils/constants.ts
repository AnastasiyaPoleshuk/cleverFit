const CONSTANTS = {
    URL: 'https://marathon-api.clevertec.ru/',
    ROUTER__PATH: {
        AUTH__PATH: '/auth',
        MAIN__PATH: '/main',
        CHANGE_PASSWORD__PATH: '/change-password',
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
};

export default CONSTANTS;
