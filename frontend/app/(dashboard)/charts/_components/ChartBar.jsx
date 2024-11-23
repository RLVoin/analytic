import {Bar, BarChart, Brush, Legend, Rectangle, Tooltip, XAxis, YAxis} from "recharts";

const ChartBar = (props) => {
    return (
        <div className="pt-2 pl-2">
            {/*{props.data.length > 0 && <><span>{props.data[0][0].direction.direction}</span></>}*/}

            <BarChart width={530} height={300} data={props.data}
                      margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                      }}>
                <XAxis dataKey="month" allowDuplicatedCategory={false} height={40} tick={{fill: '#363c4d'}}/>
                <YAxis tick={{fill: '#363c4d'}}/>
                <Tooltip/>
                <Legend verticalAlign="top"/>
                <Brush dataKey="title" height={30} stroke="#3865D8" fill="#dadde6"/>
                {props.data.map((item, index) => {
                    return (
                        <Bar key={`bar_${index}`} isAnimationActive={false} instanceId={`bar_${index}`}
                             name={item[0].departament.departament} data={item} dataKey="value" fill="#8884d8"
                             activeBar={<Rectangle fill="pink" stroke="blue"/>}/>
                    )

                })}

            </BarChart>
        </div>
    );
};

export default ChartBar