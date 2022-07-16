import axios from "axios";

export default class APIService {
  static updateTask(id, body, token) {
    return axios.put(
      `https://managemydailytasks.herokuapp.com/tasks/${id}/`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token  ${token["mytoken"]}`,
        },
      }
    );
  }
  static addTask(id, body, token) {
    return axios.post(`https://managemydailytasks.herokuapp.com/tasks/`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token  ${token["mytoken"]}`,
      },
    });
  }
  static deleteTask(id, token) {
    return axios.delete(
      `https://managemydailytasks.herokuapp.com/tasks/${id}/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token  ${token["mytoken"]}`,
        },
      }
    );
  }
  static loginUser(data) {
    return axios.post("https://managemydailytasks.herokuapp.com/login", data);
  }
  static registerUser(data) {
    return axios.post("https://managemydailytasks.herokuapp.com/auth/", data);
  }
}
