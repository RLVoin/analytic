import {Area, AreaChart, Brush, Legend, ReferenceLine, Tooltip, XAxis, YAxis} from "recharts";

const ChartFilledLine = (props) => {
    // Предполагается, что props.data - это двумерный массив
    const departmentsData = props.data; // ваше предполагаемое двумерное значение

    const digits_to_months = {
        1: "Январь",
        2: "Февраль",
        3: "Март",
        4: "Апрель",
        5: "Май",
        6: "Июнь",
        7: "Июль",
        8: "Август",
        9: "Сентябрь",
        10: "Октябрь",
        11: "Ноябрь",
        12: "Декабрь",
    }

    const formatMonth = (month) => {
        return digits_to_months[month] || month; // Возвращает название месяца, если нет - возвращает число
    };

    return (<div className="pt-2 pl-2">
            {/*{departmentsData.length > 0 && (*/}
            {/*    <span>{departmentsData[0][0].direction.direction}</span>*/}
            {/*)}*/}

            <AreaChart
                width={700}
                height={300}
                data={departmentsData.flat()} // Объединяем вложенные массивы
                margin={{
                    top: 0, right: 40, left: 20, bottom: 30,
                }}
            >
                <XAxis dataKey="month" allowDuplicatedCategory={false} angle={-45} tick={{fill: '#363c4d', dy: 20}}
                       tickFormatter={formatMonth}/>
                <YAxis tick={{fill: '#363c4d'}}/>
                {/*<YAxis tick={{fill: '#363c4d'}} domain={[0, 200]}/>*/}
                <Tooltip labelFormatter={formatMonth}/>
                <Legend verticalAlign="top"/>
                {/*<ReferenceLine y={100} label="Цель" stroke="green" strokeDasharray="3 3" />*/}
                {/*<Brush dataKey="month" height={30} stroke="#3865D8" fill="#dadde6" />*/}

                {departmentsData.map((departmentData, index) => {
                    const departmentName = departmentData[0].departament.departament;
                    if (props.deps.includes(departmentName)) {
                        return (<Area
                                key={index}
                                type="monotone"
                                dataKey="value"
                                data={departmentData}
                                name={departmentName}
                                stroke="#5050eb"
                                fill="#5050eb"
                                isAnimationActive={false}
                            />);
                    }
                })}
            </AreaChart>
        </div>);
};

export default ChartFilledLine;
