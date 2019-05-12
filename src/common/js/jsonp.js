//封装jsonp
import originJSONP from "jsonp"
import { reject } from "q";
export default function jsonp(url,data,option){
    url+=(url.indexOf("?"<0)?'?':"&")+param(data)
    return new Promise((resolve,reject)=>{
        originJSONP(url,option,(err,data)=>{
            if(!err){
                resolve(data)
            }else{
                reject(err)
            }
        })
    })
}
function param(data){//拼接url,使可以接收对象
    let url=""
    for(var k in data){
        let value=data[k]!==undefined?data[k]:""
        url+=`&${k}=${encodeURIComponent(value)}` //encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
    }
    return url?url.substring(1):""
}