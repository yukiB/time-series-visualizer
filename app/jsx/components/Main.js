import React from 'react'
import Sample from './Sample'
import Sample2 from './Sample2'

let namespace = '/test';
let socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);

export class LogNode extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {data} = this.props;
        return (
                <div>{'Received #' + data.count + ': ' + data.data}</div>
        );
    }
}

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            pingPong: "",
            emitPost: "",
            broadPost: ""
        };
    }

    componentWillMount() {
        socket.on('connect', () => {
                socket.emit('my_event', {data: 'I\'m connected!'});
        });

        socket.on('my_response', (msg)  => {
            let {data} = this.state;
            data.push(msg)
            this.setState({data: data});
        });

        let ping_pong_times = [];
        let start_time;
        //window.setInterval(( ) =>  {
        //    start_time = (new Date).getTime();
        //    socket.emit('my_ping');
        //}, 1000);

        socket.on('my_pong', () =>  {
            let latency = (new Date).getTime() - start_time;
            ping_pong_times.push(latency);
            ping_pong_times = ping_pong_times.slice(-30); // keep last 30 samples
            let sum = 0;
            for (var i = 0; i < ping_pong_times.length; i++)
                sum += ping_pong_times[i];
            this.setState({pingPong: Math.round(10 * sum / ping_pong_times.length) / 10});
        });
    }

    emit() {
        let val = this.refs.emitData;
        console.log(val.value);
        socket.emit('my_event', {data: val.value});
        this.setState({emitPost: ""});
        
    }

    broadCast() {
        let val = this.refs.broadcastData;
        console.log(val.value);
        socket.emit('my_broadcast_event', {data: val.value});
        this.setState({broadPost: ""});
    }

    emitChangeHandler(e) {
        this.setState({emitPost: e.target.value});
    }

    broadChangeHandler(e) {
        this.setState({broadPost: e.target.value});
    }

    render() {
        let {pingPong, data, emitPost, broadPost} = this.state;
        let i = 0;
        let logNodes = this.state.data.map((d) => {
            i += 1;
            return(<LogNode data={d} key={i} />);
        });
        return(
                <div className="main">
                <Sample2 />
                <Sample2 />
                <h2>Sends:</h2>
                <div>
                <input type="text" ref="emitData" name="emit_data" id="emit_data" placeholder="Message" value={emitPost}   onChange={this.emitChangeHandler.bind(this)}/>
                <input type="button" value="Echo" onClick={this.emit.bind(this)} />
                </div>
                <div>
                <input type="text" ref="broadcastData" name="broadcast_data" id="broadcast_data" placeholder="Message" value={broadPost} onChange={this.broadChangeHandler.bind(this)}/>
                <input type="button" value="Broadcast" onClick={this.broadCast.bind(this)} />
                </div>
                <h2>Receives:</h2>
                {logNodes}
                </div>
        );
    }
}

