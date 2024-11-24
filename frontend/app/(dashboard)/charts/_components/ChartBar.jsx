import {Bar, BarChart, Brush, Legend, Rectangle, Tooltip, XAxis, YAxis} from "recharts";

const ChartBar = (props) => {

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

    return (
        <div className="pt-2 pl-2">
            {/*{props.data.length > 0 && <><span>{props.data[0][0].direction.direction}</span></>}*/}

            <BarChart width={500} height={300} data={props.data}
                      margin={{
                          top: 0,
                          right: 40,
                          left: 20,
                          bottom: 30,
                      }}>
                <XAxis dataKey="month" allowDuplicatedCategory={false} height={40} angle={-45}
                       tick={{fill: '#363c4d', dy: 20}} tickFormatter={formatMonth}/>
                <YAxis tick={{fill: '#363c4d'}}/>
                <Tooltip labelFormatter={formatMonth}/>
                <Legend verticalAlign="top"/>
                {/*<Brush dataKey="title" height={30} stroke="#3865D8" fill="#dadde6"/>*/}
                {props.data.map((item, index) => {
                    const departmentName = item[0].departament.departament;
                    if (props.deps.includes(departmentName)) {
                        return (
                            <Bar key={`bar_${index}`} isAnimationActive={false} instanceId={`bar_${index}`}
                                 name={item[0].departament.departament} data={item} dataKey="value" fill="#8884d8"
                                 activeBar={<Rectangle fill="pink" stroke="blue"/>}/>
                        )
                    }

                })}

            </BarChart>
        </div>
    );
};

export default ChartBar