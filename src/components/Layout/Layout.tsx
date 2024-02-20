import { Navigation } from '@components/Navigation/Navigation';
import { MainPage } from '@pages/MainPage';

export const Layout = () => {
    return (
        <div className='app'>
            <Navigation />
            <MainPage />
        </div>
    );
};
