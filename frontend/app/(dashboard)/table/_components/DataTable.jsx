"use client"

import axios from "axios";
import {useEffect, useState} from "react";
import {Input, InputNumber, Table, Form, Popconfirm, Typography, ConfigProvider, Select} from "antd";
import {EditOutlined} from "@ant-design/icons"


const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    const inputNode = <InputNumber className="w-14"/>;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Пожалуйста, введите ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};


const DataTable = (props) => {

    const [form] = Form.useForm();
    const [tableId, setTableId] = useState(1)
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            age: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };


    const save = async (key) => {
        console.log(key)
        try {
            const row = await form.validateFields();
            const newData = [...props.data];
            const index = newData.findIndex((item) => key.key === item.id);
            if (index > -1) {
                let item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                item = newData[index];
                await axios.put("http://localhost:8000/charts/update_data", {
                    direction_id: item.direction.id,
                    departament_id: item.departament.id,
                    year: item.year,
                    values: {
                        "1": item.january,
                        "2": item.february,
                        "3": item.march,
                        "4": item.april,
                        "5": item.may,
                        "6": item.june,
                        "7": item.july,
                        "8": item.august,
                        "9": item.september,
                        "10": item.october,
                        "11": item.november,
                        "12": item.december
                    }
                })
                    .then(res => {
                        if (res.status === 200) {
                            props.fetchData(props.tableId)
                            return res.data
                        }
                    })
                setEditingKey('');
            } else {
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const digits_to_months = {
        1: "january",
        2: "february",
        3: "march",
        4: "april",
        5: "may",
        6: "june",
        7: "july",
        8: "august",
        9: "september",
        10: "october",
        11: "november",
        12: "december",
    }


    const direction = []
    const departament = []


    // console.log(data)

    props.data.forEach(opt => {
        if (!direction.some(item => item.direction === opt.direction.direction)) {
            direction.push({
                key: opt.id,
                direction_id: opt.direction.id,
                direction: opt.direction.direction,
                january: 0,
                february: 0,
                march: 0,
                april: 0,
                may: 0,
                june: 0,
                july: 0,
                august: 0,
                september: 0,
                october: 0,
                november: 0,
                december: 0,
            })
        }
        const index = direction.findIndex(el => el.direction === opt.direction.direction)
        direction[index][digits_to_months[opt.month]] += opt.value
    })

    props.data.forEach(opt => {
        if (!departament.some(item => item.departament === opt.departament.departament && item.direction === opt.direction.direction)) {
            departament.push({
                key: opt.id,
                direction_id: opt.direction.id,
                departament_id: opt.departament.id,
                departament: opt.departament.departament,
                direction: opt.direction.direction,
                january: 0,
                february: 0,
                march: 0,
                april: 0,
                may: 0,
                june: 0,
                july: 0,
                august: 0,
                september: 0,
                october: 0,
                november: 0,
                december: 0,
            })
        }
        const index = departament.findIndex(el => el.departament === opt.departament.departament && el.direction === opt.direction.direction)
        departament[index][digits_to_months[opt.month]] += opt.value
    })


    // console.log(departament)

    const columns = [
        {
            title: 'Направление', dataIndex: 'direction', key: 'direction', width: '20%'
        },
        {title: 'Январь', dataIndex: 'january', key: 'january'},
        {title: 'Февраль', dataIndex: 'february', key: 'february'},
        {title: 'Март', dataIndex: 'march', key: 'march'},
        {title: 'Апрель', dataIndex: 'april', key: 'april'},
        {title: 'Май', dataIndex: 'may', key: 'may'},
        {title: 'Июнь', dataIndex: 'june', key: 'june'},
        {title: 'Июль', dataIndex: 'july', key: 'july'},
        {title: 'Август', dataIndex: 'august', key: 'august'},
        {title: 'Сентябрь', dataIndex: 'september', key: 'september'},
        {title: 'Октябрь', dataIndex: 'october', key: 'october'},
        {title: 'Ноябрь', dataIndex: 'november', key: 'november'},
        {title: 'Декабрь', dataIndex: 'december', key: 'december'},
    ];


//     onCell={
//     (record, cellIndex) => {
//         return {
//             onClick: (e) => {
//                 console.log(record, cellIndex)
//             }
//         }
//     }
// }
    const expandedColumn = [
        {title: 'Отделение', dataIndex: 'departament', key: 'key'},
        {
            title: 'Январь', dataIndex: 'january', key: 'january', editable: true,

        },
        {title: 'Февраль', dataIndex: 'february', key: 'february', editable: true},
        {title: 'Март', dataIndex: 'march', key: 'march', editable: true},
        {title: 'Апрель', dataIndex: 'april', key: 'april', editable: true},
        {title: 'Май', dataIndex: 'may', key: 'may', editable: true},
        {title: 'Июнь', dataIndex: 'june', key: 'june', editable: true},
        {title: 'Июль', dataIndex: 'july', key: 'july', editable: true},
        {title: 'Август', dataIndex: 'august', key: 'august', editable: true},
        {title: 'Сентябрь', dataIndex: 'september', key: 'september', editable: true},
        {title: 'Октябрь', dataIndex: 'october', key: 'october', editable: true},
        {title: 'Ноябрь', dataIndex: 'november', key: 'november', editable: true},
        {title: 'Декабрь', dataIndex: 'december', key: 'december', editable: true},
        {
            title: '',
            dataIndex: 'operation',
            width: '3%',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <Typography.Link
                onClick={() => save(record)}
                style={{
                    marginInlineEnd: 8,
                }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        <EditOutlined className="text-xl text-gray-600"/>
                    </Typography.Link>
                );
            },
        },
    ];

    const mergedColumns = expandedColumn.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: 'number',  // Укажите тип как число
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
                onClick: () => {
                    if (editingKey === '') {
                        edit(record);
                    }
                },
                onDoubleClick: () => {
                    save(record)
                }
                // onCell: (record, rowIndex) => {
                //     return {
                //         onClick: (event) => {
                //             console.log(event)
                //         }, // click row
                //         onDoubleClick: (event) => {
                //             console.log(event)
                //         }, // double click row
                //         onContextMenu: (event) => {
                //             console.log(event)
                //         }, // right button click row
                //         onMouseEnter: (event) => {
                //             console.log(event)
                //         }, // mouse enter row
                //         onMouseLeave: (event) => {
                //             console.log(event)
                //         }, // mouse leave row
                //     };
                // }
            }),
        };
    });


    const expandedRowRender = (record) => (
        <Form form={form} component={false}>
            <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            headerBg: '#e0e0e0',
                            headerBorderRadius: 0,
                            footerBg: '#e0e0e0',
                        },
                    },
                }}
            >
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    dataSource={departament.filter(dep => dep.direction === record.direction)}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={false}
                    footer={() => {
                    }}
                />
            </ConfigProvider>
        </Form>
    );

    console.log(direction)
    console.log(departament)

    return (
        <div className="overflow-y-scroll max-h-[80vh]">
            <Table
                pagination={false}
                bordered
                loading={!direction.length > 0}
                columns={columns}
                expandable={{
                    expandedRowRender
                }}
                dataSource={direction}
            />
        </div>
    );
};


export default DataTable