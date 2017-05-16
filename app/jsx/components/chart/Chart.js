import React from 'react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {height: 200, width: 180, ry: 10, ratio: 0.8};
    }
    componentWillMount() {
        
    }
    render () {
        let {data} = this.props;
        return (
                <LineChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis type='number' dataKey="name" domain={["dataMin", "dataMin+500"]} minTickGap={20} />
                <YAxis domain={[0, 20]} />
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="sin" stroke="#8884d8" isAnimationActive={false} dot={false} activeDot={false}/>
                </LineChart>
        );
    }
}
