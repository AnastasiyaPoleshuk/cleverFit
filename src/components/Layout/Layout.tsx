import { Loader } from '@components/Loader/Loader';
import { Navigation } from '@components/Navigation/Navigation';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { MainPage } from '@pages/MainPage';
import { useEffect, useState } from 'react';

export const Layout = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { isLoading: isLoadingUserState } = useAppSelector((state) => state.user);
    const { isLoading: isLoadingState } = useAppSelector((state) => state.changePassword);

    useEffect(() => {
        setIsLoading(isLoadingState || isLoadingUserState);
    }, [isLoadingState]);

    return (
        <div className='app'>
            <Navigation />
            <MainPage />
            {isLoading && <Loader />}
        </div>
    );
};
