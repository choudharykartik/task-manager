import axios from "axios";

export default class APIService {
  static updateTask(id, body) {
    return axios.put(
      `https://managemydailytasks.herokuapp.com/tasks/${id}/`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token  7401b7e6e4bd7cc53dbec656464317b83b361d45",
        },
      }
    );
  }
  static addTask(id, body) {
    return axios.post(`https://managemydailytasks.herokuapp.com/tasks/`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token  7401b7e6e4bd7cc53dbec656464317b83b361d45",
      },
    });
  }
  static deleteTask(id) {
    return axios.delete(
      `https://managemydailytasks.herokuapp.com/tasks/${id}/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token  7401b7e6e4bd7cc53dbec656464317b83b361d45",
        },
      }
    );
  }
  static loginUser(data) {
    return axios.post("https://managemydailytasks.herokuapp.com/auth/", data);
  }
}
