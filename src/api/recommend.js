import jsonp from "../common/js/jsonp"
import { commonParams, options } from "./config"
export function getRecommend() {
    const url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg" //推荐页面接口
    const data = Object.assign({}, commonParams, {
        platform: "h5",
        uin: 0,
        needNewCode: 1
    })
    console.log(jsonp(url, data, options))
    return jsonp(url, data, options)
}