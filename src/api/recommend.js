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
// export function getDiscList(){//获取歌单数据
//     // const url ="https://c.y.qq.com/splcloud/fcgi-bin/fxg_get_diss_by_tag.fcg"
//     const url="https://u.y.qq.com/cgi-bin/musicu.fcg"
//     const data = Object.assign({}, commonParams, {
//         platform: "yqq.json",notice:0,
//         hostUin: 0,
//         sin:0,
//         ein:29,
//         sortId:5,
//         needNewCode: 0,
//         categoryId:10000000,
//         rnd:Math.random()
        
//     })
//     return jsonp(url, data, options)
// }