import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo,reqUserLogout } from '@/api'
import {setToken,getToken,removeToken} from '@/utils/token'
const state = {
    code: '',
    token: getToken(),
    userInfo: {}
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
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
            // 持久化存储token
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },

    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error("faile"))
        }
    },

    // 退出登录
    async userLogout({commit}){
        let result=await reqUserLogout()
        if(result.code==200){
            // 发送mutation清空用户信息
            commit('CLEARUSERINFO')
            // 调用函数清空本地存储的token
            removeToken()
            return result.message
        }else{
            return Promise.reject(new Error(result.message))
        }
    },
}
const mutations = {
    GETDATA(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo || {}
    },
    // 清空用户信息
    CLEARUSERINFO(state){
        state.userInfo={}
        state.token=""
        state.code=""
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}