<template>
  <div>
    <!-- 使用三级联动组件（全局组件不需要进一步引入） -->
    <TypeNav />
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'

import {mapState} from 'vuex'
export default {
  name: "Home",
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    this.$store.dispatch('getFloorList')
  },
  computed:{
    ...mapState({
      floorList:(state)=>state.home.floorList
    })
  }
};
</script>

<style>
</style>