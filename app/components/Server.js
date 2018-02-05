import axios from "axios"

export default class Server {
  constructor(user) {
    this.axiosInstance = axios.create()
    this.user = user
  }

  get(url) {
    return this.request("get", url)
  }

  post(url, data) {
    return this.request("post", url, data)
  }

  patch(url, data) {
    return this.request("patch", url, data)
  }

  delete(url) {
    return this.request("delete", url)
  }

  request(method, url, data) {
    const headers = this.user
      ? { Authorization: `Bearer ${this.user.jwt}` }
      : {}
    return this.axiosInstance.request({ method, url, data, headers })
  }
}
