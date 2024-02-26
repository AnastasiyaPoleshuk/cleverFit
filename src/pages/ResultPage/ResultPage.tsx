import './ResultPage.scss';
import { Loader } from '@components/Loader/Loader';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Outlet } from 'react-router-dom';

export const ResultPage = () => {
    const { isLoading: isLoadingUserState } = useAppSelector((state) => state.user);
    const { isLoading } = useAppSelector((state) => state.changePassword);
    return (
        <div className='result-page'>
            <div className='result__box'>
                <Outlet />
            </div>
            {(isLoadingUserState || isLoading) && <Loader />}
        </div>
    );
};
