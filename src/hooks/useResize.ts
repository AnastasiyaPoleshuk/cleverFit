// use-resize.js
import { useState, useEffect } from 'react';

export const useResize = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = (event) => {
            setWidth(event.target.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {
        width,
        isScreenSm: width <= SCREEN_SM,
        isScreenMd: width <= SCREEN_MD,
        isScreenLg: width <= SCREEN_LG,
    };
};

const SCREEN_SM = 360;
const SCREEN_MD = 834;
const SCREEN_LG = 1440;
