import React,{Component} from 'react';
import logo from '../itachi.jpg';
import '../App.css';
import {Link} from "react-router-dom";


export class Welcome extends Component {



  handleSignup = ()=>{
        window.location = "/signup";
    };
    handleConnect = ()=>{
        window.location ="/login"
    };
render(){






    return (
        <div>
          <header className="App-header">
            <h1> PADOL APP </h1>
            <div className="FormField pb-5">
              <button onClick={this.handleSignup} className="FormField__Button mr-20">M'inscrire</button> <button onClick={this.handleConnect} className="FormField__Button mr-20">Se connecter</button>
            </div>


          </header>
        </div>
        );
    }
}
