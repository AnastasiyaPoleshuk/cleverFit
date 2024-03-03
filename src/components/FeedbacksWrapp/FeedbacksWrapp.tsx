import { sortFeedbacks } from '@utils/sortFeedbacks';
import { IFeedbacks } from '../../types/apiTypes';
import './FeedbacksWrapp.scss';
import { FeedbackItem } from '@components/FeedbackItem/FeedbackItem';
import { Button } from 'antd';
import CONSTANTS from '@utils/constants';
import { AppContext } from '../../context/AppContext';
import { useContext, useEffect, useState } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

export const FeedbacksWrapp = () => {
    const { feedbacks, isGetFeedbacksSuccess } = useAppSelector((state) => state.feedbacks);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [feedbacksArr, setFeedbacksArr] = useState(feedbacks);
    const [sortedFeedbacks, setSortedFeedbacks] = useState(sortFeedbacks(feedbacks));
    const { openModal } = useContext(AppContext);

    useEffect(() => {
        if (isGetFeedbacksSuccess) {
            setSortedFeedbacks(sortFeedbacks(feedbacks));
        }

        if (!isCollapsed) {
            setFeedbacksArr(sortedFeedbacks);
        } else {
            setFeedbacksArr(setDefaultFeedbacksArr(sortedFeedbacks));
        }
    }, [isCollapsed, isGetFeedbacksSuccess]);

    return (
        <div className='feedbacks-wrapp'>
            <div className={`feedbacks ${isCollapsed ? 'collapsed' : 'not-collapsed'}`}>
                {feedbacksArr.map((feedback: IFeedbacks) => (
                    <FeedbackItem
                        itemData={feedback}
                        key={feedback.id ? feedback.id : feedback.createdAt}
                    />
                ))}
            </div>

            <div className='feedbacks-wrapp__btn-wrapp'>
                <Button
                    type='primary'
                    onClick={() => openModal(CONSTANTS.CREATE_FEEDBACK_MODAL)}
                    className='feedbacks-wrapp__btn'
                    data-test-id='write-review'
                >
                    Написать отзыв
                </Button>
                <Button
                    type='link'
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    data-test-id='all-reviews-button'
                >
                    {isCollapsed ? 'Развернуть все отзывы' : 'Свернуть все отзывы'}
                </Button>
            </div>
        </div>
    );
};

function setDefaultFeedbacksArr(feedbacks: IFeedbacks[]) {
    const defaultArr = [];
    const length =
        feedbacks.length > CONSTANTS.DEFAULT__FEEDBACKS_COUNT
            ? CONSTANTS.DEFAULT__FEEDBACKS_COUNT
            : feedbacks.length;
    for (let i = 0; i < length; i++) {
        defaultArr.push(feedbacks[i]);
    }
    return defaultArr;
}
