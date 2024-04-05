import { Drawer, Radio, RadioChangeEvent, Table, Tag, Button } from 'antd';
import './TariffDrawer.scss';
import {
    CheckCircleFilled,
    CheckCircleOutlined,
    CloseCircleOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import { AppContext } from '../../context/AppContext';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { PostTariffThunk } from '@redux/thunk/userThunks';
import moment from 'moment';
import { useResize } from '@hooks/useResize';
import { UserSelector } from '@utils/StoreSelectors';

const AdvantagesTableColumns = [
    {
        title: '',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '',
        dataIndex: 'free',
        key: 'free',
    },
    {
        title: '',
        dataIndex: 'pro',
        key: 'pro',
    },
];

const priseTableColumns = [
    {
        title: '',
        dataIndex: 'period',
        key: 'period',
    },
    {
        title: '',
        dataIndex: 'prise',
        key: 'prise',
    },
    {
        title: '',
        dataIndex: 'isChecked',
        key: 'isChecked',
    },
];

const drawerMobileStyles = {
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
};

const drawerStyles = {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
};

const drawerMobileStylesHeader = {
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    borderBottom: 'none',
};

const drawerStylesHeader = {
    borderBottom: 'none',
};

type AdvantagesTableData = {
    key: string;
    name: string;
    free: JSX.Element;
    pro: JSX.Element;
};

type PriseTableData = {
    key: string;
    period: JSX.Element;
    prise: JSX.Element;
    isChecked: JSX.Element;
};

export const TariffDrawer = () => {
    const [days, setDays] = useState(0);
    const { width: windowWidth, isScreenSm } = useResize();
    const [isMobile, setIsMobile] = useState(isScreenSm);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
    const [priseTableDataSource, setPriseTableDataSource] = useState<PriseTableData[]>([]);
    const [advantagesTableDataSource, setAdvantagesTableDataSource] = useState<
        AdvantagesTableData[]
    >([]);
    const { setTariffDrawerStatus, isTariffDrawerOpen } = useContext(AppContext);
    const { tariff, user } = useAppSelector(UserSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setIsMobile(isScreenSm);
    }, [windowWidth]);

    useLayoutEffect(() => {
        if (tariff.length) {
            const priseTableData = tariff[0].periods.map((item) => {
                return {
                    key: `${item.days}`,
                    period: <span>{item.text}</span>,
                    prise: (
                        <h5 className='prise__prise'>{`${item.cost
                            .toString()
                            .replace('.', ',')}$`}</h5>
                    ),
                    isChecked: <Radio value={item.days} data-test-id={`tariff-${item.cost}`} />,
                };
            });

            setPriseTableDataSource([
                {
                    key: 'Стоимость тарифа',
                    period: <p className='prise__title'>Стоимость тарифа</p>,
                    prise: <></>,
                    isChecked: <></>,
                },
                ...priseTableData,
            ]);

            setAdvantagesTableDataSource([
                {
                    key: 'FREE/PRO',
                    name: '',
                    free: (
                        <Tag
                            color='default'
                            style={{ borderRadius: 2, border: 'none', padding: '4px 8px' }}
                        >
                            FREE
                        </Tag>
                    ),
                    pro: (
                        <Tag
                            color='processing'
                            style={{ borderRadius: 2, border: 'none', padding: '4px 8px' }}
                        >
                            PRO
                            {user.tariff ? (
                                <CheckCircleOutlined style={{ color: '#87d068' }} />
                            ) : (
                                ''
                            )}
                        </Tag>
                    ),
                },
                {
                    key: 'Статистика за месяц',
                    name: 'Статистика за месяц',
                    free: <CheckCircleFilled />,
                    pro: <CheckCircleFilled />,
                },
                {
                    key: 'Статистика за все время',
                    name: 'Статистика за все время',
                    free: <CloseCircleOutlined style={{ color: '#8c8c8c' }} />,
                    pro: <CheckCircleFilled />,
                },
                {
                    key: 'Совместные тренировки',
                    name: 'Совместные тренировки',
                    free: <CheckCircleFilled />,
                    pro: <CheckCircleFilled />,
                },
                {
                    key: 'Участие в марафонах',
                    name: 'Участие в марафонах',
                    free: <CloseCircleOutlined style={{ color: '#8c8c8c' }} />,
                    pro: <CheckCircleFilled />,
                },
                {
                    key: 'Приложение IOS',
                    name: 'Приложение IOS',
                    free: <CloseCircleOutlined style={{ color: '#8c8c8c' }} />,
                    pro: <CheckCircleFilled />,
                },
                {
                    key: 'Приложение Android',
                    name: 'Приложение Android',
                    free: <CloseCircleOutlined style={{ color: '#8c8c8c' }} />,
                    pro: <CheckCircleFilled />,
                },
                {
                    key: 'Индивидуальный Chat GPT',
                    name: 'Индивидуальный Chat GPT',
                    free: <CloseCircleOutlined style={{ color: '#8c8c8c' }} />,
                    pro: <CheckCircleFilled />,
                },
            ]);
        }
    }, [tariff]);

    const onChangePrise = (e: RadioChangeEvent) => {
        setSubmitButtonDisabled(false);
        setDays(e.target.value);
    };

    const closeDrawer = () => {
        setTariffDrawerStatus(false);
    };

    const changeTariff = () => {
        dispatch(PostTariffThunk({ tariffId: tariff[0]._id, days }));
        closeDrawer();
    };

    return (
        <Drawer
            title={<h4 className='tariff-drawer__title'>Сравнить тарифы</h4>}
            styles={{
                header: isMobile ? drawerMobileStylesHeader : drawerStylesHeader,
                body: { padding: '0 24px 0 24px' },
                content: isMobile ? drawerMobileStyles : drawerStyles,
            }}
            data-test-id='tariff-sider'
            width={408}
            height={550}
            placement={isMobile ? 'bottom' : 'right'}
            open={isTariffDrawerOpen}
            closable={false}
            destroyOnClose={true}
            mask={false}
            maskClosable={false}
            className='tariff-drawer'
            footer={
                user.tariff ? null : (
                    <Button
                        type='primary'
                        disabled={submitButtonDisabled}
                        onClick={changeTariff}
                        className='tariff-submit__btn'
                        data-test-id='tariff-submit'
                    >
                        Выбрать и оплатить
                    </Button>
                )
            }
            extra={
                <CloseOutlined
                    onClick={closeDrawer}
                    style={{ color: '#8c8c8c' }}
                    data-test-id='modal-drawer-right-button-close'
                />
            }
        >
            {user.tariff ? (
                <Tag
                    color='processing'
                    style={{ borderRadius: 2, border: 'none', padding: '14px 49px' }}
                >
                    Ваш PRO tarif активен до {moment(user.tariff.expired).format('DD.MM')}
                </Tag>
            ) : null}

            <Table
                dataSource={advantagesTableDataSource}
                columns={AdvantagesTableColumns}
                pagination={false}
                showHeader={false}
                rowClassName='tariff-advantages__rows'
            />

            {user.tariff ? null : (
                <Radio.Group onChange={onChangePrise} value={days} className='prise__table-wrapp'>
                    <Table
                        dataSource={priseTableDataSource}
                        columns={priseTableColumns}
                        pagination={false}
                        showHeader={false}
                        rowClassName='tariff-advantages__rows'
                        data-test-id='tariff-cost'
                    />
                </Radio.Group>
            )}
        </Drawer>
    );
};
