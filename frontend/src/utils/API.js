import axios from "axios";
const headers = {
    "Content-Type": "application/json",
  };
const burl = "http://localhost:8800";

export default{
    test: function() {
        return axios.get(
            `${burl}/`,
            {
                params:{
                    email: email,
                    password: password
                }
            },
            {
                headers: headers
            }
        );
    },
    }
