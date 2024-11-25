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

    return (
        <PieChart width={530} height={300}
                  margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                  }}>
            <Tooltip/>
            <Pie data={departmentsData[0]} dataKey="value" nameKey="title" cx="50%" cy="50%" outerRadius={60} fill="#8884d8"/>
            {/*<Pie data={props.data} dataKey="pv" nameKey="title" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label/>*/}
        </PieChart>
    );
};

export default ChartPie