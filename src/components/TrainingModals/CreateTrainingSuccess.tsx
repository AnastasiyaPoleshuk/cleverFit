import { Alert } from 'antd';

export const CreateTrainingSuccess = ({ title }: { title: string }) => (
    <Alert
        message={title}
        type='success'
        showIcon
        closable
        data-test-id='create-training-success-alert'
        className='create-training__alert'
        style={{
            position: 'absolute',
            zIndex: 100,
            bottom: 80,
            borderRadius: 2,
            left: '50%',
            transform: 'translate(-50%)',
        }}
    />
);
