import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Rate } from 'antd';
import { IFeedbacks } from '../../types/apiTypes';
import './FeedbackItem.scss';
import moment from 'moment';
import CONSTANTS from '@utils/constants';

export const FeedbackItem = ({ itemData }: { itemData: IFeedbacks; key: string }) => {
    return (
        <div className='feedback-card'>
            <div className='card__info'>
                {itemData.imageSrc ? (
                    <Avatar
                        size={42}
                        icon={
                            <img
                                src={itemData.imageSrc}
                                alt='user image'
                                className='card__info-img'
                            />
                        }
                    />
                ) : (
                    <Avatar size={42} icon={<UserOutlined />} />
                )}

                <h4 className='card__info-username'>
                    {itemData.fullName ? itemData.fullName : 'Пользователь'}
                </h4>
            </div>
            <div className='card__rating'>
                <div className='rating-info'>
                    <Rate
                        disabled
                        defaultValue={itemData.rating}
                        character={({ value, index }) => {
                            return value && index < value ? <StarFilled /> : <StarOutlined />;
                        }}
                    />
                    <span className='card__date'>
                        {moment(itemData.createdAt).locale('ru').format(CONSTANTS.DATE_FORMAT)}
                    </span>
                </div>
                <h4 className='card__info-message'>{itemData.message}</h4>
            </div>
        </div>
    );
};
