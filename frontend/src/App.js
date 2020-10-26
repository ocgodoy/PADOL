import React from 'react';
import logo from './itachi.jpg';
import './App.css';
//import 'utils/API.js'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={apiResponse:""};
  }
  callAPI(){
    fetch("http://localhost:8800/test").then(res => res.text()).then(res => this.setState({apiResponse: res}))
  }
  componentWillMount(){
    this.callAPI();
  }

render() {

  return (
    <div className="App">
      <header className="App-header">
      <p> Je suis itachi uchiwa </p>
        <img src={logo}  alt="itachi" />

      </header>
      <p> {this.state.apiResponse} </p>
    </div>
  );
}
}

export default App;
