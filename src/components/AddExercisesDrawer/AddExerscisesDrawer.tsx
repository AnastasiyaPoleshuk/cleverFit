import { Badge, BadgeProps, Button, Checkbox, Drawer, Form, Input, InputNumber, Space } from 'antd';
import './AddExercisesDrawer.scss';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import CONSTANTS from '@utils/constants';
import { ITrainingExercises } from '../../types/storeTypes';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export interface IExercises {
    approaches?: number;
    name?: string;
    replays?: number;
    weight?: number;
}

export interface IFormValues {
    exercises: IExercises[];
}

interface IProps {
    isOpen: boolean;
    onClose: (type: string) => void;
    trainingType: string;
    trainingName: string;
    date: string;
}

const defaultFormListValue = [
    { approaches: undefined, name: '', replays: undefined, weight: undefined },
];

export const AddExercisesDrawer = ({
    isOpen,
    onClose,
    trainingType,
    trainingName,
    date,
}: IProps) => {
    const { saveExercisesData, exercisesData } = useContext(AppContext);
    const [exerciseFields, setExerciseFields] = useState<IExercises[]>(exercisesData);
    const [isImplementation, setIsImplementation] = useState(false);

    useEffect(() => {
        setExerciseFields(exercisesData);
    }, [exercisesData]);

    const onValuesChange = (changedValues: IExercises, allValues: IFormValues) => {
        if (allValues.exercises.length) {
            const filteredExercises = allValues.exercises.filter((item) => {
                return item?.name?.length > 0;
            });

            const exercises = filteredExercises.map((item) => {
                const exerciseNameCheck = item ? item.name : null;
                console.log(item, exerciseNameCheck, !!exerciseNameCheck);
                return {
                    name: item.name,
                    replays: item.replays || 1,
                    weight: item.weight || 0,
                    approaches: item.approaches || 1,
                    isImplementation,
                };
            });

            exercises.length ? setExerciseFields(exercises as ITrainingExercises[]) : null;
        }
    };

    const closeDrawer = () => {
        exerciseFields.length ? saveExercisesData(exerciseFields as ITrainingExercises[]) : null;
        setExerciseFields([]);

        onClose(CONSTANTS.DRAWER);
    };

    const addField = (add: (defaultValue?: any, insertIndex?: number | undefined) => void) => {
        add();
    };

    return (
        <Drawer
            title={
                <span className='drawer__header'>
                    <PlusOutlined />
                    <h4 className='drawer__header_title'>Добавление упражнений</h4>
                </span>
            }
            styles={{
                header: { borderBottom: 'none' },
                body: { padding: '0 24px 24px 24px' },
                mask: { background: 'transparent' },
            }}
            className='drawer__body'
            width={408}
            placement={window.innerWidth > 360 ? 'right' : 'bottom'}
            onClose={closeDrawer}
            open={isOpen}
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
            <article className='drawer__body_info'>
                <div>
                    <Badge color={trainingType as BadgeProps['color']} />
                    <span style={{ marginLeft: 6 }}>{trainingName}</span>
                </div>

                <span>{date}</span>
            </article>
            <Form
                name='add-exercises__form'
                onValuesChange={onValuesChange}
                autoComplete='off'
                className='add-exercises__form'
            >
                <Form.List
                    name='exercises'
                    initialValue={exercisesData.length ? exerciseFields : defaultFormListValue}
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
                                                <Checkbox
                                                    style={{ height: '24px !important' }}
                                                    onChange={() =>
                                                        setIsImplementation(!isImplementation)
                                                    }
                                                    data-test-id={`modal-drawer-right-checkbox-exercise${index}`}
                                                />
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
                            <Form.Item>
                                <Button
                                    type='link'
                                    onClick={() => add()}
                                    block
                                    icon={<PlusOutlined />}
                                    className='add-form-item__btn'
                                >
                                    Добавить ещё
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        </Drawer>
    );
};
