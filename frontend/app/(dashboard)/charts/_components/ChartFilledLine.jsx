import { Area, AreaChart, Brush, Legend, Tooltip, XAxis, YAxis } from "recharts";

const ChartFilledLine = (props) => {
    // Предполагается, что props.data - это двумерный массив
    const departmentsData = props.data; // ваше предполагаемое двумерное значение
    return (
        <div className="pt-2 pl-2">
            {/*{departmentsData.length > 0 && (*/}
            {/*    <span>{departmentsData[0][0].direction.direction}</span>*/}
            {/*)}*/}

            <AreaChart
                width={1100}
                height={300}
                data={departmentsData.flat()} // Объединяем вложенные массивы
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <XAxis dataKey="month" allowDuplicatedCategory={false} height={40} tick={{ fill: '#363c4d' }} />
                <YAxis tick={{ fill: '#363c4d' }} />
                <Tooltip />
                <Legend verticalAlign="top" />
                <Brush dataKey="month" height={30} stroke="#3865D8" fill="#dadde6" />

                {departmentsData.map((departmentData, index) => {
                    const departmentName = departmentData[0].departament.departament;
                    return (
                        <Area
                            key={index}
                            type="monotone"
                            dataKey="value"
                            data={departmentData}
                            name={departmentName}
                            stroke="#5050eb"
                            fill="#5050eb"
                            isAnimationActive={false}
                        />
                    );
                })}
            </AreaChart>
        </div>
    );
};

export default ChartFilledLine;
