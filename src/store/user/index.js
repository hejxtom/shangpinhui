import { reqGetCode, reqUserRegister,reqUserLogin } from '@/api'

const state = {
    code: '',
    token:''
}
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETDATA', result.data)
            return 'ok'
        } else {
            Promise.reject(new Error('验证码发送失败'))
        }
    },

    // 用户注册
    async userRegister({ commit }, data) {
        let result = await reqUserRegister(data)
        console.log(result)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },

    // 登录
    async userLogin({commit},data){
        let result=await reqUserLogin(data)
       if(result.code==200){
            commit('USERLOGIN',result.data.token)
            return 'ok'
       }else{
            return Promise.reject(new Error(result.message))
       }
    }
}
const mutations = {
    GETDATA(state, code) {
        state.code = code
    },
    USERLOGIN(state,token){
        state.token=token
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}