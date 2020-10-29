import axios from "axios";
const headers = {
    "Content-Type": "application/json",
  };
const burl = "http://localhost:8888";

export default{
  signup: function(email, password, login) {
      return axios.post(burl + "/user/signup", {
          email: email,
          password: password,
          login: login
      });
  },
    }
