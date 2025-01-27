"use client"

import axios from "axios";
import {useEffect, useState} from "react";
import {Button, Form, Input, Select, Table,} from "antd";
import ModalPatient from "@/app/(dashboard)/new_table/_components/ModalPatient";

export default function NewTable() {

    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false)

    const fetchData = async () => {
        await axios.get('http://localhost:8000/charts/get_data/').then(res => {
            if (res.status === 200) {
                setData(res.data);
            }
        }).catch(err => {
            console.log(err)
        })
    }


    useEffect(() => {
        fetchData()
    }, []);

    const okHandler = () => {
        setIsModalOpen(false)
    }

    const cancelHandler = () => {
        setIsModalOpen(false)
    }

    const openHandler = () => {
        setIsModalOpen(true)
    }

    const columns = [
        {
            title: "Пациент",
            key: "name",
            render: (text, record, index) => {
                return (
                    <div className="cursor-pointer" onClick={openHandler}>Пациент {record.id}</div>
                )
            }
        },
        {
            title: "Возраст",
            dataIndex: "value",
            key: "age",
        },
        {
            title: "Дата смерти",
            // dataIndex: "",
            key: "death",
        },
        {
            title: "Причина",
            key: "reason",
            render: (text, record) => {
                return (
                    record.departament?.departament
                )
            },
        }
    ]

    return (
        <div>
            <ModalPatient isModalOpen={isModalOpen} okHandler={okHandler} cancelHandler={cancelHandler}/>
            <div className="min-h-10 mb-4 bg-white rounded-lg">
                <Form
                    className="flex justify-between p-4"
                    layout="inline"
                >
                    <div className="flex w-auto">
                        <Form.Item>
                            <Input

                            />
                        </Form.Item>
                        <Form.Item>
                            <Input

                            />
                        </Form.Item>
                        <Form.Item>
                            <Select
                                style={{
                                    minWidth: '170px',
                                }}
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item>
                            <Button
                                type="primary"
                            >
                                Показать
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
            <Table dataSource={data} columns={columns} rowKey={(record) => record.id}/>
        </div>
    )
}