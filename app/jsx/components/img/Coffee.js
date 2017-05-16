import React from 'react'

export default class Coffee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {height: 200, width: 180, ry: 10, ratio: 0.8};
    }
    
    componentWillMount() {
        
    }
    
    componentWillReceiveProps(nextProps) {
        let r  = nextProps.data.sin / 20;
        this.setState({ratio: r});
    }
    
    render () {
        let {width, height, ry, ratio} = this.state;
        let {data} = this.props;
        return (
                <div id="coffee" style={{bottom: "0px"}}>
                <div className='mug-img'/>
                <svg width={300} height={300}  id="coffee-svg">
                <g transform={'translate(32, ' + (30 + height * (1 - ratio)) + ')'}>
                <clipPath id="coffeeshape">
                <ellipse className='coffee-ellipse' cy={ry} cx={width / 2} ry={ry * (2 - ratio)} rx={width / 2}/>
                <rect className='coffee-rect' y={ry} width={width} height={height * ratio}/>
                <ellipse className='coffee-ellipse' cy={height * ratio + ry} cx={width / 2} ry={ry * 2} rx={width / 2}/>
                </clipPath>
                <g>
                <ellipse className='coffee-shape' cy={ry} cx={width / 2} ry={ry * (2  - ratio)} rx={width / 2}/>
                <rect  width="100%" height="100%" className='coffee-shape' clipPath="url(#coffeeshape)"/>
                <ellipse className='coffee-shape' cy={height * ratio + ry} cx={width / 2} ry={ry * 2} rx={width / 2}/>   
                </g>
                </g>
                </svg>
            </div>
        );
    }
}
