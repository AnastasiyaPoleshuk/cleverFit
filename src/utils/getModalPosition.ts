import CONSTANTS from './constants';

export const getModalPosition = ({
    element,
    windowWidth,
    isScreenSm,
}: {
    element: Element | null;
    windowWidth: number;
    isScreenSm: boolean;
}) => {
    if (!element) return { top: '0', left: '0' };

    const cellRect = element.getBoundingClientRect();
    const rightThreshold = Math.round(windowWidth - Math.round(cellRect.left));
    const modalWidth = 520;

    if (!isScreenSm) {
        return {
            top: `${cellRect.top - 4}px`,
            left: `${
                rightThreshold < modalWidth
                    ? cellRect.right - CONSTANTS.CREATE_TRAINING_MODAL_WIDTH + 14
                    : cellRect.left
            }px`,
        };
    } else {
        return {
            top: '32%',
            left: '24px',
        };
    }
};
