import axios from "axios";

export default class APIService {
  static updateTask(id, body, token) {
    return axios.put(`http://localhost:8000/tasks/${id}/`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${token["mytoken"]}`,
      },
    });
  }
  static addTask(id, body, token) {
    return axios.post(`http://localhost:8000/tasks/`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${token["mytoken"]}`,
      },
    });
  }
  static deleteTask(id, token) {
    return axios.delete(`http://localhost:8000/tasks/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${token["mytoken"]}`,
      },
    });
  }
  static loginUser(data) {
    return axios.post("http://localhost:8000/login", data);
  }
  static registerUser(data) {
    return axios.post("https://managemydailytasks.herokuapp.com/auth/", data);
  }
}
