import { Spin } from 'antd';
import './Loader.scss';

export const Loader = () => {
    return (
        <div className='loader' data-test-id='loader'>
            <Spin className='loader__spin' />
        </div>
    );
};
