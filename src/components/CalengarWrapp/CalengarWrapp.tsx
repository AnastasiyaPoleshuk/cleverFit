import { Badge, BadgeProps, Calendar, Empty } from 'antd';
import { Moment } from 'moment';
import 'moment/locale/ru';

import './CalengarWrapp.scss';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useContext, useEffect, useState } from 'react';
import { calendarLocale } from '@utils/constants';
import { IGetTrainingListResponse, IGetTrainingsResponse } from '../../types/apiTypes';
import moment from 'moment';
import { CalendarCellInfoModal } from '@components/CalendarCellInfoModal/CalendarCellInfoModal';
import { AppContext } from '../../context/AppContext';
import { AddExercisesDrawer } from '@components/AddExercisesDrawer/AddExerscisesDrawer';
import { CreateTrainingFail } from '@components/ErrorModals/CreateTrainingFail';
import { useResize } from '@hooks/useResize';
import { CalendarCreateTrainingModal } from '@components/CalendarCellInfoModal/CalendarCreateTrainingModal';
import { calendarSelector } from '@utils/StoreSelectors';
import { getTrainingColor } from '@utils/getTrainingColor';
import { getModalPosition } from '@utils/getModalPosition';

const getListData = (
    value: Moment,
    trainingInfo: IGetTrainingsResponse[],
    trainingList: IGetTrainingListResponse[],
) => {
    const ListData = trainingInfo.map((training) => {
        if (!training.date) {
            return;
        }

        const dt = moment(training.date);
        const trainings = [];

        if (value.date() == +dt.format('DD')) {
            const currentTraining = trainingList.find(
                (listItem) => listItem.name === training.name,
            );
            currentTraining ? trainings.push(currentTraining as IGetTrainingListResponse) : null;
            return currentTraining;
        }
        return;
    });

    if (ListData?.length) {
        return ListData.filter(Boolean);
    }
    return [];
};
const getCurrentDayTrainings = (day: Moment, allTrainingsArr: IGetTrainingsResponse[]) => {
    return allTrainingsArr.filter((item) => moment(item.date).format('DD') === day.format('DD'));
};

export const CalengarWrapp = ({ trainings }: { trainings: IGetTrainingsResponse[] }) => {
    const {
        isCreateTrainingSuccess,
        isGetTrainingListSuccess,
        isCreateTrainingError,
        isUpdateTrainingError,
        trainingList,
        trainingInfo,
    } = useAppSelector(calendarSelector);
    const [cellData, setCellData] = useState(<></>);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isModalRender, setIsModalRender] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: '0', left: '0' });
    const [selectedDate, setSelectedDate] = useState<Moment>(moment());
    const { width: windowWidth, isScreenSm } = useResize();
    const { addExercisesData, isDrawerOpen, isAddTrainingModalOpen, closeModal } =
        useContext(AppContext);

    useEffect(() => {
        isGetTrainingListSuccess ? setIsModalRender(true) : null;
    }, [isGetTrainingListSuccess]);

    useEffect(() => {
        if (isCreateTrainingSuccess) {
            getCurrentDayTrainings(selectedDate, trainingInfo);
            const modalBodyData = dateCellRender(selectedDate);

            setCellData(modalBodyData as JSX.Element);
        }
    }, [trainingInfo]);

    useEffect(() => {
        if (isCreateTrainingError || isUpdateTrainingError) {
            setIsOpenModal(false);
            CreateTrainingFail(() => setIsOpenModal(false));
        }
    }, [isCreateTrainingError, isUpdateTrainingError]);

    const onSelect = (value: Moment) => {
        getCurrentDayTrainings(value, trainingInfo);
        if (value.month() !== selectedDate.month()) {
            setSelectedDate(value ? value : moment());
            return;
        }

        const dateElementArr = filterDays(
            value.daysInMonth(),
            document.querySelectorAll(`.ant-picker-calendar-date-value`),
        );
        let element = null;

        for (let i = 0; i < dateElementArr.length; i++) {
            if (dateElementArr[i].innerHTML === value.format('DD')) {
                element = dateElementArr[i];
            }
        }

        const newPosition = getModalPosition({ element, windowWidth, isScreenSm });
        const modalBodyData = dateCellRender(value);

        setModalPosition(newPosition);
        setSelectedDate(value ? value : moment());
        setCellData(
            modalBodyData?.props.children ? (
                modalBodyData
            ) : (
                <>
                    <p className='modal__no-content_text'>Нет активных тренировок</p>
                    <Empty
                        image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                        imageStyle={{
                            height: 32,
                            margin: '16px 0',
                        }}
                        description={''}
                    />
                </>
            ),
        );
        setIsOpenModal(true);
    };

    const dateCellRender = (value: Moment) => {
        if (isGetTrainingListSuccess) {
            const listData = getListData(
                value,
                trainings,
                trainingList,
            ) as unknown as IGetTrainingListResponse[];

            return (
                <ul className='events'>
                    {listData.length
                        ? listData.map((item, index) => (
                              <li key={item.key} className='trainings__list-item'>
                                  <Badge
                                      color={getTrainingColor(item.name) as BadgeProps['color']}
                                      text={item.name}
                                  />
                              </li>
                          ))
                        : ''}
                </ul>
            );
        }
    };

    return (
        <>
            <div className='calendar__wrapp'>
                {windowWidth <= 361 ? (
                    <Calendar
                        locale={calendarLocale}
                        onSelect={onSelect}
                        className='calendar'
                        fullscreen={false}
                        styles={{ header: { display: 'flex', alignItems: 'baseline' } }}
                    ></Calendar>
                ) : (
                    <Calendar
                        locale={calendarLocale}
                        cellRender={(value: Moment) => dateCellRender(value)}
                        onSelect={onSelect}
                        style={{ background: 'transperant' }}
                        className='calendar'
                        fullscreen={true}
                    ></Calendar>
                )}
                {isModalRender && (
                    <CalendarCellInfoModal
                        date={selectedDate.format('DD.MM.YYYY')}
                        trainingsData={getCurrentDayTrainings(selectedDate, trainingInfo)}
                        modalPosition={modalPosition}
                        isModalOpen={isOpenModal}
                        isAddTrainingDisabled={selectedDate < moment()}
                        setOpen={setIsOpenModal}
                    />
                )}
                <CalendarCreateTrainingModal
                    date={selectedDate.format('DD.MM.YYYY')}
                    isModalOpen={isAddTrainingModalOpen}
                    trainingsListData={trainingList}
                    trainingsData={getCurrentDayTrainings(selectedDate, trainingInfo)}
                    modalPosition={modalPosition}
                    closeModal={closeModal}
                    openInfoModal={setIsOpenModal}
                />
            </div>
            <AddExercisesDrawer
                isOpen={isDrawerOpen}
                date={addExercisesData.date}
                trainingName={addExercisesData.name}
                trainingType={
                    getTrainingColor(
                        trainingList.find((training) => training.name === addExercisesData.name)
                            ?.key || '',
                    ) || ''
                }
                onClose={closeModal}
            />
        </>
    );
};

function filterDays(monthDays: number, nodeList: NodeListOf<Element>) {
    const arrayToReturn: Element[] = [];
    const elements = Array.from(nodeList);

    const startIndex = elements.findIndex((element, index) => {
        const day = parseInt(element.textContent.trim(), 10);
        if (day === 1) {
            if (index < monthDays) {
                const nextElementDay =
                    elements[index + 1] && parseInt(elements[index + 1].textContent.trim(), 10);
                return nextElementDay === 2;
            }
        }
        return false;
    });

    if (startIndex !== -1) {
        const currentMonthElements = elements.slice(startIndex, startIndex + monthDays);

        return currentMonthElements;
    }
    return arrayToReturn;
}
