import {Brush, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

const ChartLine = (props) => {
    return (
        <LineChart
            width={530} height={300} data={props.data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}>
            <XAxis dataKey="title" height={40} tick={{ fill: '#363c4d'}}/>
            <YAxis tick={{fill: '#363c4d'}}/>
            <Tooltip/>
            <Legend verticalAlign="top"/>
            <Brush dataKey="title" startIndex={0} endIndex={30} height={30} stroke="#3865D8" fill="#dadde6" />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
            <Line type="monotone" dataKey="uv" stroke="#82ca9d"/>
        </LineChart>
    );
};

export default ChartLine