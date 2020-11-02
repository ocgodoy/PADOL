import React,{Component} from 'react';
import logo from '../itachi.jpg';
import '../App.css';
import {Link} from "react-router-dom";


export class Home extends React.Component {

  constructor(props){
    super(props);
    this.state={apiResponse:""};
    this.state={user:"JAJA"};
  }
  callAPI(){
    fetch("http://localhost:8800/test").then(res => res.text()).then(res => this.setState({apiResponse: res}))
  }
  componentWillMount(){
    this.callAPI();
    this.getUser()
  }

  getUser(){
          let temp = (localStorage.getItem("user"));
          console.log(temp)
          this.setState({user: temp.login});
      };

render(){






    return (
        <div>
        <header className="App-header">
        <h1> PADOL APP </h1>
        <p> {this.state.user} </p>
          <img src={logo}  alt="itachi" />
          <p> Je suis itachi uchiwa </p>
        </header>
        <p> {this.state.apiResponse} </p>
        </div>
        );
    }
}
