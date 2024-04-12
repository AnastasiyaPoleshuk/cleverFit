import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import CONSTANTS from '@utils/constants';
import { Button, Modal, Result } from 'antd';
import { push } from 'redux-first-history';
import './ErrorModals.scss';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

export const GetRequestFail = ({
    isOpen,
    changeErrorState,
}: {
    isOpen: boolean;
    changeErrorState: ActionCreatorWithPayload<boolean, string>;
}) => {
    const dispatch = useAppDispatch();

    const close = () => {
        dispatch(changeErrorState(false));
        dispatch(push(`${CONSTANTS.ROUTER__PATH.MAIN__PATH}`));
    };

    return (
        <Modal
            open={isOpen}
            className='modal-component'
            data-test-id='modal-no-review'
            closeIcon={null}
            footer={null}
            centered={true}
        >
            <Result
                status={CONSTANTS.RESULT_STATUS_TYPE_500}
                title='Что-то пошло не так'
                subTitle={'Произошла ошибка, попробуйте ещё раз.'}
                extra={
                    <Button type='primary' className='result-fail-button' onClick={close}>
                        Назад
                    </Button>
                }
            />
        </Modal>
    );
};
