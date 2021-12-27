import axios from "axios";
// const SERVER = "http://127.0.0.3:8000/api/";
const SERVER = "http://127.0.0.1:3001/";
const headers = {
  "Content-Type": "application/json",
  Authorization: "JWT fefege..",
};

function CreateAPI() {
  return axios.post(`${SERVER}users/login`);
}

export default {
    CreateAPI,

};
