import React from 'react'
import Chart from './chart/Chart'
import Coffee from './img/Coffee'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

let namespace = '/sample';
let socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);

export default class Sample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{name: 0, sin: 9.697382446695155}],
            start: null
        };
    }
    
    componentWillMount() {
        socket.on('my_response', (msg) => {
            let {data, start} = this.state;
            if (start == null) {
                start = msg.count;
            }
            data.push({name: msg.count - start, sin:msg.data});
            if (data.length > 500)
                data.shift();
            this.setState({data: data, start: start});
        });
    }
    render () {
         let {data} = this.state;
        return (
                <div className="chart-img">
                <Chart data={data} />
                <Coffee data={data[data.length-1]}/>
                </div>)
    }
}
