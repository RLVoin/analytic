import {Legend, Pie, PieChart, Tooltip} from "recharts";



const ChartPie = (props) => {
    return (
        <PieChart width={530} height={300}
                  margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                  }}>
            <Tooltip/>
            <Pie data={props.data} dataKey="uv" nameKey="title" cx="50%" cy="50%" outerRadius={60} fill="#8884d8"/>
            <Pie data={props.data} dataKey="pv" nameKey="title" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label/>
        </PieChart>
    );
};

export default ChartPie