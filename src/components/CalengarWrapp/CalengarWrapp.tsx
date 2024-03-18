import { Badge, BadgeProps, Calendar, Empty } from 'antd';
import { Moment } from 'moment';
import 'moment/locale/ru';

import locale from 'antd/es/locale/ru_RU';

import './CalengarWrapp.scss';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useContext, useEffect, useState } from 'react';
import CONSTANTS from '@utils/constants';
import { IGetTrainingListResponse, IGetTrainingsResponse } from '../../types/apiTypes';
import moment from 'moment';
import { CalendarCellInfoModal } from '@components/CalendarCellInfoModal/CalendarCellInfoModal';
import { AppContext } from '../../context/AppContext';
import { AddExercisesDrawer } from '@components/AddExercisesDrawer/AddExerscisesDrawer';
import { EditOutlined } from '@ant-design/icons';
import { CreateTrainingFail } from '@components/ErrorModals/CreateTrainingFail';

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

const calendarLocale = {
    lang: {
        ...locale.Calendar?.lang,
        shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        shortMonths: [
            'Янв',
            'Февр',
            'Мар',
            'Апр',
            'Май',
            'Июн',
            'Июл',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек',
        ],
    },
    timePickerLocale: {
        ...locale.Calendar?.timePickerLocale,
    },
};

const getStatus = (key: string) => {
    switch (key) {
        case CONSTANTS.TRAINING_TYPE.BACK:
            return CONSTANTS.TRAINING_COLOR.BACK;
        case CONSTANTS.TRAINING_TYPE.CHEST:
            return CONSTANTS.TRAINING_COLOR.CHEST;
        case CONSTANTS.TRAINING_TYPE.HANDS:
            return CONSTANTS.TRAINING_COLOR.HANDS;
        case CONSTANTS.TRAINING_TYPE.LEGS:
            return CONSTANTS.TRAINING_COLOR.LEGS;
        case CONSTANTS.TRAINING_TYPE.STRENGTH:
            return CONSTANTS.TRAINING_COLOR.STRENGTH;
        default:
            break;
    }
};

export const CalengarWrapp = ({ trainings }: { trainings: IGetTrainingsResponse[] }) => {
    const {
        isCreateTrainingSuccess,
        isGetTrainingListSuccess,
        isCreateTrainingError,
        trainingList,
        trainingInfo,
    } = useAppSelector((state) => state.calendar);
    const [cellData, setCellData] = useState(<></>);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isModalRender, setIsModalRender] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: '0', left: '0' });
    const [selectedDate, setSelectedDate] = useState<Moment>(moment());
    const {
        addExercisesData,
        isDrawerOpen,
        saveExercisesData,
        saveCurrentExerciseName,
        closeModal,
        openModal,
    } = useContext(AppContext);

    useEffect(() => {
        isGetTrainingListSuccess ? setIsModalRender(true) : null;
    }, [isGetTrainingListSuccess]);

    useEffect(() => {
        if (isCreateTrainingSuccess) {
            getCurrentDayTrainings(selectedDate, trainingInfo);
            const modalBodyData = dateCellRender(selectedDate, true);

            setCellData(modalBodyData as JSX.Element);
        }
    }, [trainingInfo]);

    useEffect(() => {
        if (isCreateTrainingError) {
            CreateTrainingFail(() => closeAllModals());
        }
    }, [isCreateTrainingError]);

    const getModalPosition = (dateElement: Element | null) => {
        if (!dateElement) return { top: '0', left: '0' };

        const cellRect = dateElement.getBoundingClientRect();
        const rightThreshold = Math.round(window.innerWidth - Math.round(cellRect.left));
        const modalWidth = 520;

        return {
            top: `${cellRect.top - 4}px`,
            left: `${
                rightThreshold < modalWidth
                    ? cellRect.right - CONSTANTS.CREATE_TRAINING_MODAL_WIDTH
                    : cellRect.left
            }px`,
        };
    };

    const closeAllModals = () => {
        setIsOpenModal(false);
    };

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
        let dateElement = null;

        for (let i = 0; i < dateElementArr.length; i++) {
            if (dateElementArr[i].innerHTML === value.format('DD')) {
                dateElement = dateElementArr[i];
            }
        }

        const newPosition = getModalPosition(dateElement);
        const modalBodyData = dateCellRender(value, true);

        //todo допилить disabled для кнопки в модалке

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

    const editExercisesButtonClick = (date: Moment, exerciseName: string) => {
        const currentDayTrainings = getCurrentDayTrainings(date, trainingInfo);
        const exercisesToEdit =
            currentDayTrainings.find((item) => item.name.trim() === exerciseName)?.exercises || [];
        saveExercisesData(exercisesToEdit);
        saveCurrentExerciseName(exerciseName);
        openModal(CONSTANTS.ADD_TRAINING_MODAL);
    };

    const dateCellRender = (value: Moment, isModalData: boolean) => {
        if (isGetTrainingListSuccess || isModalData) {
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
                                      color={getStatus(item.key) as BadgeProps['color']}
                                      text={item.name}
                                  />

                                  {isModalData ? (
                                      <EditOutlined
                                          style={{ color: '#2f54eb' }}
                                          onClick={() => editExercisesButtonClick(value, item.name)}
                                          data-test-id={`modal-update-training-edit-button${index}`}
                                      />
                                  ) : (
                                      ''
                                  )}
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
                {window.innerWidth <= 360 ? (
                    <Calendar
                        locale={calendarLocale}
                        onSelect={onSelect}
                        className='calendar'
                        fullscreen={false}
                    ></Calendar>
                ) : (
                    <Calendar
                        locale={calendarLocale}
                        cellRender={(value: Moment) => dateCellRender(value, false)}
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
                        JSXContent={cellData}
                        modalPosition={modalPosition}
                        isModalOpen={isOpenModal}
                        isAddTrainingDisabled={selectedDate < moment()}
                        setOpen={setIsOpenModal}
                    />
                )}
            </div>
            <AddExercisesDrawer
                isOpen={isDrawerOpen}
                date={addExercisesData.date}
                trainingName={addExercisesData.name}
                trainingType={
                    getStatus(
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
