import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/Main'

let RenderComponent = () =>
	ReactDOM.render(
    	    <Main url="http://localhost:5000/data"/>,
	  document.getElementById('container')
	);


window.RenderComponent = RenderComponent;
