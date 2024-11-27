import {Button, Form, InputNumber, Modal, Select, Space} from "antd";
import {CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useState} from "react";
import axios from "axios";

export default function ModalChart(props) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [form] = Form.useForm()
    const [editIndices, setEditIndices] = useState([]);
    const [editing, setEditing] = useState(false);

    const [newConfig, setNewConfig] = useState({
        'Component': 'ChartFilledLine',
        // 'key': `${newConfig.Component}${props.config.length}`,
        'key': null,
        'directionId': 1,
        'target': null,
        'data': []
    });

    const charts = [
        {
            label: 'График с областями',
            value: 'ChartFilledLine'
        },
        {
            label: 'Гистограмма',
            value: 'ChartBar'
        },
        {
            label: 'График линейный',
            value: 'ChartLine'
        },
        {
            label: 'График круговой',
            value: 'ChartPie'
        },
    ]

    const toggleEdit = (index) => {
        if (!editIndices.includes(index)) {
            setEditing(true)
            setEditIndices(prev => [...prev, index]); // Добавляем индекс в редактируемые
        }
    };

    const cancelEdit = (index) => {
        setEditing(false)
        setEditIndices(prev => prev.filter(i => i !== index)); // Убираем индекс из редактируемых
    };

    const handleModalCancel = () => {
        props.setIsModalOpen(false);
        setNewConfig({
            'Component': 'ChartFilledLine',
            'key': `ChartFilledLine${props.config.length}`,
            'directionId': 1,
            'target': null,
            'data': []
        })
        form.resetFields()

    }

    const handleOptionOk = () => {
        props.setIsModalOpen(false)
        setNewConfig({
            'Component': 'ChartFilledLine',
            'key': `ChartFilledLine${props.config.length}`,
            'directionId': 1,
            'target': null,
            'data': []
        })
        form.resetFields()
    }

    const updateCharts = async () => {
        await axios.put(`${apiUrl}/charts/update_config`,
            {
                config: props.config
            },
            {
                headers: {
                    Authorization: `${localStorage.getItem('Authorization')}`,
                }
            }).then(res => {
            if (res.status === 200){
                props.fetchConfig()
            }
        })
    }

    const deleteHandler = async (index) => {
        const data = props.config
        data.splice(index, 1)
        props.setConfig(data)
        await updateCharts()
    }

    const onFinish = async () => {
        const data = props.config
        data.push(newConfig)
        props.setConfig(data)
        await updateCharts()
    }

    console.log(newConfig)
    return (
        <Modal title="Конфигурация графиков" width={600} open={props.isModalOpen} onOk={handleOptionOk}
               onCancel={handleModalCancel}>
            <Form layout="vertical" onFinish={() => {
                setNewConfig({...newConfig, 'key': `${newConfig.Component}${props.config.length}`})
                onFinish()
            }}>
                <Space
                    style={{display: 'flex', marginBottom: 8}}
                    align="baseline"
                >
                    <Form.Item label="Тип графика">
                        <Select
                            value={newConfig.Component}
                            style={{
                                width: 180
                            }}
                            onChange={e => {
                                setNewConfig({...newConfig, 'Component': e})
                            }}
                            options={charts}
                        />
                    </Form.Item>
                    <Form.Item label="Направление">
                        <Select
                            value={newConfig.directionId}
                            style={{
                                width: 210
                            }}
                            onChange={e => {
                                setNewConfig({...newConfig, 'directionId': e})
                            }}
                        >
                            {props.direction.map((item, index) => (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.direction}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Цель">
                        <InputNumber
                            style={{
                                width: 70
                            }}
                            onChange={e => {
                                setNewConfig({...newConfig, 'target': e})
                            }}
                        />
                    </Form.Item>
                    <Form.Item label=" " className="text-end">
                        <Button type="primary" htmlType="submit" icon={<PlusOutlined/>}/>
                    </Form.Item>
                </Space>
                {props.config.map((item, index) => {
                    return (
                        <Space
                            key={index}
                            style={{display: 'flex', marginBottom: 8}}
                            align="baseline"
                        >
                            <Form.Item label="Тип графика">
                                <Select
                                    disabled={!editIndices.includes(index)}
                                    style={{
                                        width: 180
                                    }}
                                    onChange={e => console.log(e)}
                                    options={charts}
                                    value={item.Component}
                                />
                            </Form.Item>
                            <Form.Item label="Направление">
                                <Select
                                    disabled={!editIndices.includes(index)}
                                    style={{
                                        width: 210
                                    }}
                                    value={item.directionId}
                                    onChange={e => console.log(e)}
                                >
                                    {props.direction.map((item, index) => (
                                        <Select.Option key={item.id} value={item.id}>
                                            {item.direction}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Цель">
                                <InputNumber
                                    disabled={!editIndices.includes(index)}
                                    style={{
                                        width: 70
                                    }}
                                    onChange={e => console.log(e)}
                                />
                            </Form.Item>
                            <Form.Item label=" ">
                                {!editIndices.includes(index) ?
                                    <div className="flex">
                                        <Button
                                            disabled={editing}
                                            type="text"
                                            icon={<EditOutlined/>}
                                            onClick={() => {
                                                toggleEdit(index)
                                                //     setSize(option.size.id)
                                                //     setTextile(option.textile.id)
                                                //     setPrice(option.price)
                                            }}
                                        />
                                        <Button
                                            disabled={editing}
                                            type="text"
                                            icon={<DeleteOutlined/>}
                                            onClick={() => deleteHandler(index)}
                                        />
                                    </div>
                                    :
                                    <div className="flex">
                                        <Button
                                            type="text"
                                            icon={<CheckOutlined/>}
                                            // onClick={() => saveHandler(option.id, index)}
                                        />
                                        <Button
                                            type="text"
                                            icon={<CloseOutlined/>}
                                            onClick={() => cancelEdit(index)}
                                        />
                                    </div>
                                }
                            </Form.Item>
                        </Space>
                    )
                })}
            </Form>
        </Modal>
    )
}