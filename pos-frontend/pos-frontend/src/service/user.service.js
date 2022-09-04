 import axios from 'axios';
// import { baseUserUrl } from "@/utils/urls"


 export const validateUser = ( {success, error, data}) => {
  console.log(data)
    axios
      .post("http://10.30.1.92:8086/user/login", data)
      .then((response) => {
        console.log("login API service succes..!")
        success && success(response);
      })
      .catch((e) => {
        error && error(e);
      });
  }
