export const getPeriodValue = (data: number) => {
    switch (data) {
        case 1:
            return 'Через 1 день';

        case 2:
            return 'Через 2 дня';

        case 3:
            return 'Через 3 дня';

        case 4:
            return 'Через 4 дня';

        case 5:
            return 'Через 5 дней';

        case 6:
            return 'Через 6 дней';

        case 7:
            return '1 раз в неделю';

        default:
            return '';
    }
};
