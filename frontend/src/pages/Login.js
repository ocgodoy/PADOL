import React from "react";
import API from "../utils/API";
import {Link} from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";



export class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      login:"", //login typed
      password:"", //password typed
        status: "", //Status code of the server response
    };
  }

  //Send the POST request to the server and wait the response.
  send = async () => {
    const { password, login } = this.state;
    try {
      const { data, status } =  await API.login(login, password);
        if (status === 200) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", data.user);
            window.location = "/home";
        }
    } catch (error) {
        if (error.response.status !== 200){

            this.setState({status: error.response.status})
        }
    }
  };

  //Taking note of what is typed
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {

      //Message PopUp red
      let alertPopUp = null;
      if (this.state.status == 403){
          alertPopUp = <Alert className={"mb-3"} severity="error">Utilisateur non trouvé </Alert>
      }
      if (this.state.status == 405){
          alertPopUp = <Alert className={"mb-3"} severity="error">Mot de passe éronné!</Alert>
      }

    return (
        <div>
          <header className="App-header">
            <h1> PADOL APP </h1>
            <Container className={"pt-5"}>
                <Paper className="text-center mx-auto pt-5" style={{maxWidth: "35em",}}>
                    {alertPopUp}
                  <div className="FormField">
                    <label className="FormField__Label" htmlFor="name">login</label>
                    <input type="text" id="login" className="FormField__Input" value={this.state.login} onChange={this.handleChange} />
                  </div>

                  <div className="FormField">
                    <label className="FormField__Label" htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" className="FormField__Input" value={this.state.password} onChange={this.handleChange} />
                  </div>


                  <div className="FormField pb-5">
                    <button onClick={this.send} className="FormField__Button mr-20">Connexion</button> <Link to="/signup" className="FormField__Link">Je m'inscris</Link>
                  </div>
                </Paper>
            </Container>
          </header>
        </div>
    );
  }
  }
