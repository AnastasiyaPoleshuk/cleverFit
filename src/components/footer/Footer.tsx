import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import './Footer.scss';
import { Button } from 'antd';

export const Footer = () => {
    return (
        <footer className='footer'>
            <Button type='link' className='footer__link'>
                Смотреть отзывы
            </Button>

            <div className='footer__download-blok'>
                <h6 className='download-blok__title'>Скачать на телефон</h6>
                <p className='download-blok__subtitle'>Доступно в PRO-тарифе</p>

                <div className='download-blok__btns'>
                    <button type='button' className='download-blok__btn'>
                        <AndroidFilled />
                        <span>Android OS</span>
                    </button>
                    <button type='button' className='download-blok__btn'>
                        <AppleFilled />
                        <span>Apple IOS</span>
                    </button>
                </div>
            </div>
        </footer>
    );
};
