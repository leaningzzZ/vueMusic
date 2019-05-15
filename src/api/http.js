import axios from "axios"
const api = axios.create({
    baseURL: "https://v1.itooi.cn/"
    // 登陆接口
})
api.defaults.headers.post["Content-Type"] = "application/json"

export {
    api
}