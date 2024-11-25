"use client"

import ChartFilledLine from "./_components/ChartFilledLine"
import ChartBar from "./_components/ChartBar.jsx";
import ChartLine from "./_components/ChartLine.jsx";
import ChartPie from "./_components/ChartPie.jsx";
import {PlusOutlined, PlusSquareTwoTone, SettingFilled} from "@ant-design/icons"
import axios from "axios";
import {useEffect, useState} from "react";
import {Select, Spin, FloatButton} from "antd";
import ModalChart from "@/app/(dashboard)/charts/_components/ModalChart";
import chartPie from "./_components/ChartPie.jsx";

export default function ChartPage() {
    const [direction, setDirection] = useState([])
    const [departament, setDepartament] = useState([])
    const [selectedDep, setSelectedDep] = useState(null)
    const [selectedDir, setSelectedDir] = useState(1)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [config, setConfig] = useState([])
    const [charts, setCharts] = useState([
        // {Component: ChartFilledLine, key: 'filledLine', directionId: 1, data: []},
        // {Component: ChartBar, key: 'bar', directionId: 2, data: []},
        // {Component: ChartBar, key: 'bar1', directionId: 3, data: []},
        // { Component: ChartLine, key: 'line' },
        // { Component: ChartPie, key: 'pie' },
    ]);
    const [selectedDeps, setSelectedDeps] = useState({});

    const openModalhandler = () => {
        setIsModalOpen(true)
    }

    const groupData = (data) => {
        const groupedData = data.data.reduce((acc, curr) => {
            const depId = curr.departament.id;

            if (!acc[depId]) {
                acc[depId] = [];
            }
            acc[depId].push(curr);

            return acc;
        }, {});

        return Object.values(groupedData);
    }

    const fetchConfig = async () => {
        await axios.get("http://localhost:8000/charts/get_config")
            .then(res => {
                if (res.status === 200) {
                    setConfig(res.data.config)
                    const updatedCharts = res.data.config.map(item => {
                        switch (item.Component) {
                            case 'ChartFilledLine':
                                return {...item, Component: ChartFilledLine};
                            case 'ChartBar':
                                return {...item, Component: ChartBar};
                            case 'ChartPie':
                                return {...item, Component: ChartPie};
                            default:
                                return item;
                        }
                    });
                    fetchData(updatedCharts)
                }
            })
    }
    const fetchData = async (ch) => {
        try {
            if (ch !== undefined) {
                const results = await Promise.all(
                    ch.map(async (item) => {
                        const response = await axios.get("http://localhost:8000/charts/get_data/", {
                            params: {direction_id: item.directionId},
                        });
                        return groupData(response);
                    })
                );


                const updatedCharts = ch.map((item, index) => ({
                    ...item,
                    data: results[index] || [],
                }));

                setCharts(updatedCharts);
                const updatedDeps = {};
                updatedCharts.forEach((chart, index) => {
                    updatedDeps[index] = updatedCharts[index].data.map(item => item[0].departament.departament);
                });
                setSelectedDeps(updatedDeps);
            }
        } catch (error) {
            console.error("Ошибка при получении данных графиков:", error);
        }
    }

    const updateChart = async (id, index) => {
        await axios.get("http://localhost:8000/charts/get_data/", {
            params: {
                direction_id: id,
            },
        }).then(res => {
            const updatedCharts = [...charts]
            updatedCharts[index].data = groupData(res)
            setCharts(updatedCharts);
            setSelectedDeps((prev) => ({
                ...prev,
                [index]: updatedCharts[index].data.map(item => item[0].departament.departament),
            }));
        })

    }

    const fetchDirections = async () => {
        await axios.get('http://localhost:8000/charts/get_directions')
            .then((response => {
                setDirection(response.data)
            }))
    }

    const fetchDepartaments = async () => {
        await axios.get('http://localhost:8000/charts/get_departaments')
            .then((response => {
                setDepartament(response.data)
            }))
    }


    useEffect(() => {
        // Promise.all([fetchConfig, fetchData, fetchDirections,fetchDepartaments])
        fetchConfig()
        // fetchData(charts)
        fetchDirections()
        fetchDepartaments()
    }, []);

    useEffect(() => {
        fetchData()
    }, [selectedDir]);

    // console.log(charts)
    return (
        <div>
            <ModalChart isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} config={config} direction={direction}/>
            <div className="flex flex-wrap justify-start gap-y-3 gap-x-2 mt-4 w-screen max-w-[95vw]">
                {charts.map(({Component, key, directionId, data}, index) => {
                    console.log(charts[index]);
                    return (
                        <div key={index} className="flex flex-col bg-[#fff] rounded-md min-w-[530px] min-h-[400px]">

                            {/*{console.log(charts)}*/}
                            <Spin className="mx-auto my-auto" size="large" spinning={!data.length > 0}>
                                <div className="flex gap-2 justify-end mr-1 mt-1">
                                    <Select
                                        placeholder="Параметр 1"
                                        className="w-[250px]"
                                        defaultValue={directionId}
                                        onChange={selectedDir => {
                                            console.log(selectedDir)
                                            const updatedCharts = [...charts];
                                            updatedCharts[index].directionId = selectedDir; // Update directionId
                                            setCharts(updatedCharts);
                                            updateChart(selectedDir, index)
                                        }}
                                    >
                                        {direction.map((item, index) => (
                                            <Select.Option key={item.id} value={item.id}>
                                                {item.direction}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                    <Select
                                        className="w-[250px]"
                                        mode="multiple"
                                        maxTagCount="responsive"
                                        value={selectedDeps[index] || []}
                                        onChange={selectedValues => {
                                            setSelectedDeps(prev => ({...prev, [index]: selectedValues}));
                                        }}
                                    >
                                        {data.map((item) => (
                                            <Select.Option key={item[0].departament.departament}
                                                           value={item[0].departament.departament}>
                                                {item[0].departament.departament}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                    {/*<Select className="w-[150px]"/>*/}
                                </div>
                                <div>
                                    <Component data={data} deps={selectedDeps[index]}/>
                                </div>
                            </Spin>
                        </div>
                    )

                })}
            </div>
            <FloatButton style={{
                width: '50px',
                height: '50px',
            }}
                         onClick={openModalhandler}
                         icon={<SettingFilled className="text-2xl -ml-0.5"/>}/>
            {/*<PlusSquareTwoTone onClick={openModalhandler} className="absolute right-0 top-16 text-5xl"/>*/}
            {/*<ChartPie data={charts[0].data}/>*/}
        </div>
    )
}

