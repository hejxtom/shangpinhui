import { reqUserAddress, reqOrderInfo } from '@/api'
const state = {
    userAddress: [],
    orderInfo: {}
}
const actions = {
    // 获取用户地址
    async getUserAddress({ commit }) {
        let result = await reqUserAddress()
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },

    //获取商品清单
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        if (result.code == 200) {
            commit('GETORDERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    }
}
const mutations = {
    // 获取用户地址
    GETUSERADDRESS(state, userAddress) {
        state.userAddress = userAddress || []
    },
    //获取商品清单
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo || {}
    }
}
const getters = {
    userAddress(state) {
        return state.userAddress
    },
    detailArrayList(state) {
        return state.orderInfo.detailArrayList || []
    },
    orderInfo(state){
        return state.orderInfo
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}