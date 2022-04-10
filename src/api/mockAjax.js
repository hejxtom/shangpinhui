//对axios进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 如果进度条没有显示：一定是你忘记了引入样式
import 'nprogress/nprogress.css'

//创建axios实例
let requests=axios.create({
    baseURL:'/mock',
    timeout:5000
})
//请求拦截器----在项目中发起请求（请求没有发出去）可以做一些事情
requests.interceptors.request.use((config)=>{
    // 进度条开始
    nprogress.start()
    return config
})
//响应拦截器----当服务器手动请求之后，做出响应（响应成功）会执行
requests.interceptors.response.use((res)=>{
    // 进度条结束
    nprogress.done()
    return res.data
},(error)=>{
    // console.log("服务器响应数据失败") 
    alert("服务器响应数据失败")
})

export default requests