import { Spin } from 'antd';
import './Loader.scss';
import { useEffect } from 'react';

export const Loader = () => {
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    return (
        <div className='loader' data-test-id='loader'>
            <Spin className='loader__spin' />
        </div>
    );
};
