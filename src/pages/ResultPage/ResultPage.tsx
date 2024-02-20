import './ResultPage.scss';
import { Loader } from '@components/Loader/Loader';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Outlet } from 'react-router-dom';

export const ResultPage = () => {
    const { isLoading } = useAppSelector((state) => state.isLoading);

    return (
        <div className='result-page'>
            <div className='result__box'>
                <Outlet />
            </div>
            {isLoading && <Loader />}
        </div>
    );
};
