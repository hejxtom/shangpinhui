//引入Vue
import Vue from 'vue'
import Vuex from 'vuex'

//引入子仓库
import home from './home'
import search from './search'
import detail from './detail'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        home,
        search,
        detail
    }
})