import axios from "axios";
const headers = {
    "Content-Type": "application/json",
  };
const burl = "http://localhost:8800";

export default{
  signup: function(email, password, login) {
      return axios.post(burl + "/user", {
          email: email,
          password: password,
          login: login
      });
  },
  login: function(login, password) {
      return axios.get(burl + "/user", {
        params:{
          password: password,
          login: login
        }
      });
  },
}
