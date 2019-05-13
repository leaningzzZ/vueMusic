import axios from "axios"
const api = axios.create({
    baseURL: " https://api.itooi.cn/"
    // 登陆接口
})
api.defaults.headers.post["Content-Type"] = "application/json"

export {
    api
}