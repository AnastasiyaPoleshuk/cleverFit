import { PlusOutlined, CloseOutlined, MinusOutlined, EditOutlined } from '@ant-design/icons';
import {
    Button,
    Checkbox,
    DatePicker,
    Drawer,
    Form,
    FormListFieldData,
    Input,
    InputNumber,
    Select,
    Space,
} from 'antd';
import { AppContext } from '../../context/AppContext';
import { useContext, useEffect, useState } from 'react';
import './CreateTrainingDrawer.scss';
import CONSTANTS from '@utils/constants';
import { useResize } from '@hooks/useResize';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { IGetTrainingListResponse } from '../../types/apiTypes';
import { IExercises, IFormValues } from '@components/AddExercisesDrawer/AddExerscisesDrawer';
import moment, { Moment } from 'moment';
import { UpdateTrainingThunk, CreateTrainingThunk } from '@redux/thunk/TrainingThunk';
import { ITrainingExercises } from '../../types/storeTypes';
import { calendarSelector } from '@utils/StoreSelectors';
import dayjs, { Dayjs } from 'dayjs';

const defaultFormListValue = [
    { approaches: undefined, name: '', replays: undefined, weight: undefined },
];

const weekdayOptions = [
    {
        label: 'Понедельник',
        value: 'Понедельник',
    },
    {
        label: 'Вторник',
        value: 'Вторник',
    },
    {
        label: 'Среда',
        value: 'Среда',
    },
    {
        label: 'Четверг',
        value: 'Четверг',
    },
    {
        label: 'Пятница',
        value: 'Пятница',
    },
    {
        label: 'Субботв',
        value: 'Субботв',
    },
    {
        label: 'Воскресенье',
        value: 'Воскресенье',
    },
];

const periodOptions = [
    {
        label: 'Через 1 день',
        value: 1,
    },
    {
        label: 'Через 2 дня',
        value: 2,
    },
    {
        label: 'Через 3 дня',
        value: 3,
    },
    {
        label: '1 раз в неделю',
        value: 7,
    },
];

interface ITrainingForm {
    trainingType: string;
    trainingDate: Moment;
    trainingRepeat: boolean;
    trainingPeriod: number;
    exercises: IExercises[];
}

export const CreateTrainingDrawer = ({ isDrawerOpen }: { isDrawerOpen: boolean }) => {
    const { closeModal, currentTraining } = useContext(AppContext);

    const [implementationArr, setImplementationArr] = useState<{ value: boolean; id: number }[]>([
        { value: false, id: 0 },
    ]);
    const [isShowPeriodSelect, setIsShowPeriodSelect] = useState(false);
    const [withPeriod, setWithPeriod] = useState(currentTraining?.parameters?.repeat || false);
    const [addExerciseButtonText, setAddExerciseButtonText] = useState('');
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
    const [isRemoveButtonDisabled, setIsRemoveButtonDisabled] = useState(true);
    const { trainingList } = useAppSelector(calendarSelector);
    const { isScreenSm } = useResize();
    const [trainingDate, setTrainingDate] = useState(
        currentTraining.date
            ? dayjs(currentTraining.date, 'YYYY-MM-DD')
            : dayjs(dayjs().add(1, 'day'), 'YYYY-MM-DD'),
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        setAddExerciseButtonText('Добавление упражнений');

        if (currentTraining.exercises?.length) {
            setAddExerciseButtonText('Добавить ещё');
            const checkboxData = currentTraining.exercises.map((exercise, index) => {
                return { value: exercise.isImplementation, id: index };
            });

            setImplementationArr(checkboxData);

            const activeCheckbox = currentTraining.exercises.find((item) => {
                return item.isImplementation === true;
            });

            if (activeCheckbox) {
                setIsRemoveButtonDisabled(false);
            }
        }
    }, [currentTraining]);

    useEffect(() => {
        if (isDrawerOpen && currentTraining.name) {
            setIsSubmitButtonDisabled(false);
            setWithPeriod(currentTraining.parameters?.repeat || false);
        }
    }, [isDrawerOpen]);

    const closeDrawer = () => {
        setWithPeriod(false);
        setIsSubmitButtonDisabled(true);
        closeModal(CONSTANTS.CREATE_TRAINING_DRAWER);
    };

    const removeItem = (remove: (field: number) => void, fields: FormListFieldData[]) => {
        const checkedItem = implementationArr.find((item) => item.value === true);

        if (checkedItem) {
            const itemForDelete = fields.find((item, index) => {
                if (index === checkedItem.id) {
                    return item;
                }
                return null;
            });

            if (itemForDelete) {
                const filteredArr = implementationArr.filter((item) => item.value !== true);
                setImplementationArr(
                    filteredArr.map((item, index) => {
                        return { value: item.value, id: index };
                    }),
                );

                remove(itemForDelete.name);

                setIsRemoveButtonDisabled(true);
            }
        }
    };

    const addField = (add: () => void) => {
        setImplementationArr((state) => {
            return [...state, { value: false, id: implementationArr.length }];
        });
        add();
    };

    const options = (trainingsListData: IGetTrainingListResponse[]) => {
        return trainingsListData.map((item) => {
            return {
                label: item.name,
                value: item.name,
            };
        });
    };

    const toggleTrainingPeriod = (isPeriod: boolean) => {
        setWithPeriod(isPeriod);

        if (!isPeriod) {
            setIsShowPeriodSelect(false);
        }
    };

    const createExercisesArr = (defaultArr: IExercises[]) => {
        const filteredExercises = defaultArr.filter((item) => item.name !== undefined);
        const exercises = filteredExercises.map((item) => {
            return {
                name: item.name,
                replays: item.replays || 1,
                weight: item.weight || 0,
                approaches: item.approaches || 1,
                isImplementation: item.isImplementation || false,
            };
        });
        return exercises as ITrainingExercises[];
    };

    const onSubmit = (values: ITrainingForm) => {
        const id = currentTraining._id;
        const trainingDate = values.trainingDate ? values.trainingDate : moment().add(1, 'days');
        let trainingPeriod: number | null;

        if (withPeriod && !values.trainingPeriod) {
            trainingPeriod = 1;
        } else {
            trainingPeriod = null;
        }

        const request = {
            _id: id,
            name: values.trainingType || currentTraining.name,
            date: trainingDate.format(CONSTANTS.DATE_FORMAT_REQUEST),
            parameters: {
                repeat: withPeriod,
                period: values.trainingPeriod || trainingPeriod,
            },
            exercises: createExercisesArr(values.exercises),
        };

        if (request._id) {
            dispatch(
                UpdateTrainingThunk({ ...request, isImplementation: trainingDate < moment() }),
            );
        } else {
            dispatch(CreateTrainingThunk({ ...request, isImplementation: false }));
        }
        closeDrawer();
    };

    const onPeriodChange = (value: number | string) => {
        if (value === 7) {
            setIsShowPeriodSelect(true);
        } else {
            setIsShowPeriodSelect(false);
        }
    };

    const onValuesChange = (changedValues: ITrainingForm, allValues: IFormValues) => {
        if (changedValues.exercises?.length) {
            setAddExerciseButtonText('Добавить ещё');
        }

        if (changedValues.trainingType) {
            setIsSubmitButtonDisabled(false);
        }

        if (allValues.exercises.length) {
            const filteredExercises = allValues.exercises.filter((item, index) => {
                if (item?.name?.length < 0) {
                    setImplementationArr(implementationArr.slice(index, 1));
                }
                return item?.name?.length > 0;
            });

            const activeCheckbox = implementationArr.find((item) => {
                return item.value === true;
            });

            if (activeCheckbox) {
                setIsRemoveButtonDisabled(false);
            }
        }
    };

    const disablePastDays = (currentDate: Moment) => {
        if (currentDate < moment()) {
            return true;
        }
        return false;
    };

    const updateRemoveItemButtonState = (index: number) => {
        const currentElement = implementationArr.find((item) => {
            return item.id === index;
        });

        if (currentElement) {
            currentElement.value = !currentElement.value;
            implementationArr[index] = currentElement;
            setImplementationArr(implementationArr);
            setIsRemoveButtonDisabled(currentElement.value ? false : true);
        }
    };

    const handleDateChange = (date: Dayjs) => {
        setTrainingDate(date);
    };

    return (
        <Drawer
            title={
                <span className='drawer__header'>
                    {currentTraining.name ? <EditOutlined /> : <PlusOutlined />}
                    <h4 className='drawer__header_title'>
                        {currentTraining.name ? 'Редактирование тренировки' : 'Новая тренировка'}
                    </h4>
                </span>
            }
            styles={{
                header: { borderBottom: 'none' },
                body: { padding: '0 24px 24px 24px' },
                mask: { background: 'transparent' },
            }}
            className='drawer__body'
            width={408}
            height={550}
            placement={isScreenSm ? 'bottom' : 'right'}
            onClose={closeDrawer}
            open={isDrawerOpen}
            closable={false}
            destroyOnClose={true}
            data-test-id='modal-drawer-right'
            extra={
                <CloseOutlined
                    onClick={closeDrawer}
                    style={{ color: '#8c8c8c' }}
                    data-test-id='modal-drawer-right-button-close'
                />
            }
        >
            <Form
                name='add-exercises__form'
                autoComplete='off'
                className='add-exercises__form'
                onFinish={onSubmit}
                onValuesChange={onValuesChange}
            >
                <div className='training-info__box'>
                    <Form.Item name='trainingType'>
                        <Select
                            defaultValue={
                                currentTraining.name
                                    ? currentTraining.name
                                    : 'Выбор типа тренировки'
                            }
                            disabled={currentTraining.name ? true : false}
                            options={options(trainingList)}
                            className='training-info__select-type'
                            data-test-id='modal-create-exercise-select'
                        />
                    </Form.Item>

                    <div className='training-info__period'>
                        <Form.Item
                            name='trainingDate'
                            className='training-info__select-date__form-item'
                        >
                            <DatePicker
                                size='small'
                                className='training-info__select-date'
                                format={CONSTANTS.DATE_FORMAT}
                                data-test-id='modal-drawer-right-date-picker'
                                disabledDate={disablePastDays}
                                onChange={handleDateChange}
                                defaultValue={
                                    currentTraining.date
                                        ? dayjs(currentTraining.date, 'YYYY-MM-DD')
                                        : dayjs(dayjs().add(1, 'day'), 'YYYY-MM-DD')
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name='trainingRepeat'
                            className='training-info__select-date__form-item'
                        >
                            <Checkbox
                                name='trainingRepeat'
                                onChange={(e) => toggleTrainingPeriod(e.target.checked)}
                                checked={withPeriod}
                                value={withPeriod}
                                className='training-info__period-checkbox'
                                data-test-id='modal-drawer-right-checkbox-period'
                            >
                                С переодичностью
                            </Checkbox>
                        </Form.Item>
                    </div>
                    <div className='training-info__period'>
                        {withPeriod && (
                            <Form.Item
                                name='trainingPeriod'
                                className='training-info__select-date__form-item'
                            >
                                <Select
                                    defaultValue={
                                        periodOptions.find(
                                            (item) =>
                                                item.value == currentTraining.parameters?.period,
                                        )?.label || periodOptions[0].label
                                    }
                                    options={periodOptions}
                                    onChange={onPeriodChange}
                                    className='training-info__select-period'
                                    data-test-id='modal-drawer-right-select-period'
                                />
                            </Form.Item>
                        )}
                        {isShowPeriodSelect && (
                            <Select
                                defaultValue='Понедельник'
                                options={weekdayOptions}
                                className='training-info__select-period'
                            />
                        )}
                    </div>
                </div>
                <Form.List
                    name='exercises'
                    initialValue={
                        currentTraining.exercises?.length
                            ? currentTraining.exercises
                            : defaultFormListValue
                    }
                >
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }, index) => (
                                <Space
                                    key={key}
                                    style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 8 }}
                                    align='baseline'
                                >
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'name']}
                                        className='form-item'
                                        rules={[{ required: false }]}
                                    >
                                        <Input
                                            type='text'
                                            placeholder='Упражнение'
                                            className='form-input__exercise'
                                            data-test-id={`modal-drawer-right-input-exercise${index}`}
                                            addonAfter={
                                                currentTraining.exercises?.length ? (
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'isImplementation']}
                                                        className='form-item'
                                                        rules={[{ required: false }]}
                                                    >
                                                        <Checkbox
                                                            style={{ height: '24px !important' }}
                                                            className='form-input__exercise'
                                                            data-test-id={`modal-drawer-right-checkbox-exercise${index}`}
                                                            onChange={() =>
                                                                updateRemoveItemButtonState(index)
                                                            }
                                                        />
                                                    </Form.Item>
                                                ) : null
                                            }
                                        />
                                    </Form.Item>
                                    <div className='form-item__blok'>
                                        <span className='form-item__input-label'>Подходы</span>
                                        <span className='form-item__input-label'>Вес, кг</span>
                                        <span className='form-item__input-label'>Колличество</span>
                                    </div>
                                    <div className='form-item__blok'>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'replays']}
                                            className='form-item'
                                            rules={[{ required: false }]}
                                        >
                                            <InputNumber
                                                addonBefore='+'
                                                placeholder='1'
                                                className='form-item__input'
                                                data-test-id={`modal-drawer-right-input-approach${index}`}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'weight']}
                                            className='form-item'
                                            rules={[{ required: false }]}
                                        >
                                            <InputNumber
                                                placeholder='0'
                                                className='form-item__input'
                                                data-test-id={`modal-drawer-right-input-weight${index}`}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'approaches']}
                                            className='form-item'
                                            rules={[{ required: false }]}
                                        >
                                            <InputNumber
                                                placeholder='3'
                                                className='form-item__input'
                                                data-test-id={`modal-drawer-right-input-quantity${index}`}
                                            />
                                        </Form.Item>
                                    </div>
                                </Space>
                            ))}
                            <div className='buttons-group'>
                                <Form.Item>
                                    <Button
                                        type='link'
                                        onClick={() => addField(() => add())}
                                        block
                                        icon={<PlusOutlined />}
                                        className='add-form-item__btn'
                                    >
                                        {addExerciseButtonText}
                                    </Button>
                                </Form.Item>
                                {fields.length && currentTraining.exercises?.length ? (
                                    <Form.Item>
                                        <Button
                                            type='link'
                                            onClick={() => removeItem(remove, fields)}
                                            block
                                            icon={<MinusOutlined />}
                                            className='remove-form-item__btn'
                                            disabled={isRemoveButtonDisabled}
                                        >
                                            Удалить
                                        </Button>
                                    </Form.Item>
                                ) : null}
                            </div>
                        </>
                    )}
                </Form.List>
                <Form.Item className='submit__btn'>
                    <Button
                        type='primary'
                        htmlType='submit'
                        className='add-training__btn'
                        disabled={
                            currentTraining.isImplementation || isSubmitButtonDisabled
                                ? true
                                : false
                        }
                    >
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
};
