import {Button, Form, Modal, Select, Space} from "antd";
import {CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useState} from "react";

export default function ModalChart(props) {
    const [editIndices, setEditIndices] = useState([]);
    const [editing, setEditing] = useState(false);

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

    const charts = [
        {
            label: 'FilledChart',
            value: 'ChartFilledLine'
        },
        {
            label: 'BarChart',
            value: 'ChartBar'
        },
        {
            label: 'LineChart',
            value: 'ChartLine'
        },
        {
            label: 'PieChart',
            value: 'ChartPie'
        },
    ]

    const handleModalCancel = () => {
        props.setIsModalOpen(false);
    }

    const handleOptionOk = () => {
        props.setIsModalOpen(false)
    }

    return(
        <Modal title="Опции" width={600} open={props.isModalOpen} onOk={handleOptionOk} onCancel={handleModalCancel}>
            <Form layout="vertical">
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
                                    placeholder="Параметр 1"
                                    style={{
                                        width: 170
                                    }}
                                    onChange={e => console.log(e)}
                                    options={charts}
                                    defaultValue={item.Component}
                                />
                            </Form.Item>
                            <Form.Item label="Направление">
                                <Select
                                    disabled={!editIndices.includes(index)}
                                    placeholder="Параметр 1"
                                    style={{
                                        width: 170
                                    }}
                                    defaultValue={item.directionId}
                                    onChange={e => console.log(e)}
                                >
                                    {props.direction.map((item, index) => (
                                        <Select.Option key={item.id} value={item.id}>
                                            {item.direction}
                                        </Select.Option>
                                    ))}
                                </Select>
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
                                            // onClick={() => deleteHandler(option.id)}
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