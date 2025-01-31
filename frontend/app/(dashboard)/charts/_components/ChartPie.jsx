import {Legend, Pie, PieChart, Tooltip} from "recharts";



const ChartPie = (props) => {

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
        <PieChart width={700} height={300}
                  margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                  }}>
            <Tooltip/>
            <Legend/>
            <Pie data={departmentsData[0]} legendType="diamond" dataKey="value" nameKey="title" cx="50%" cy="50%" innerRadius={60} fill="#8884d8" label/>
            {/*<Pie data={props.data} dataKey="pv" nameKey="title" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label/>*/}
        </PieChart></div>
    );
};

export default ChartPie