import {reqSearchInfo} from '@/api'
//search模块的仓库
const state={
    searchList:{}
}
//action|用户处理派发action地方的，可以书写异步语句、自己逻辑地方
const actions={
    async getSearchList(context,params={}){
        const result=await reqSearchInfo(params)
        if(result.code===200){
            context.commit('GETSEARCHLIST',result.data)
        }
    }
}
//mutions是唯一修改state的地方
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
}
//计算属性
//项目当中getters主要的作用是:简化仓库中的数据(简化数据而生)
//可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了】
const getters={
    //当前形参state，当前仓库中的state，并非大仓库中的那个state
    attrsList(state){
    //state.searchList.goodsList如果服务器数据回来了，没问题是一个数组
     //假如网络不给力|没有网state.searchList.goodsList应该返回的是undefined
     //计算新的属性的属性值至少给人家来一个数组
        return state.searchList.attrsList || []
    },
    goodsList(state){
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    }

}

export default {
    state,
    actions,
    mutations,
    getters
}