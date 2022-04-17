//购物车仓库
import { reqCartList } from '@/api'

const state = {
    cartList: [],
}
const actions = {
    //获取购物车列表数据
    async getCartList({ commit }) {
        const result = await reqCartList()
        // console.log(result)
       if(result.code==200){
        commit('GETCARTLIST',result.data)
       }
    }
}
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList=cartList
    }
}
const getters = {
    cartList(state){
        return state.cartList[0] || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}



