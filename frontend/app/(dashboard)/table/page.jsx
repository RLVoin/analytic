"use client"

import axios from "axios";
import {useEffect, useState} from "react";
import {Input, InputNumber, Table, Form, Popconfirm, Typography, ConfigProvider, Select, Spin} from "antd";
import DataTable from "@/app/(dashboard)/table/_components/DataTable";

export default function TablePage(props){

    const [data, setData] = useState([]);
    const [tableId, setTableId] = useState(1)
    const [loading, setLoading] = useState(true)



    const fetchData = async (table_id) => {
        setData([])
        await axios.get("http://localhost:8000/charts/get_data/", {
            params: {
                table_id: table_id
            }
        }).then((response) => {
            setData(response.data)
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchData(1)
    }, []);

    if (loading){
        return <Spin/>
    }

    return (
        <div className="flex flex-col gap-2">
            <Select
                defaultValue={1}
                onChange={(e) => {
                    fetchData(e)
                    setTableId(e)
                }}
                style={{
                    width: 150
                }}
                options={[
                    {
                        value: 1,
                        label: "Таблица 1"
                    },
                    {
                        value: 2,
                        label: "Таблица 2"
                    }
                ]}
            />
            <DataTable data={data} fetchData={fetchData} tableId={tableId} />
        </div>

    );
};
