<template>
  <div>
    <div class="top-list">
      <top-list-item v-for="item in topListData" :item="item" @showListPage="toggleSongListPage"></top-list-item>
    </div>
  </div>

</template>
<style>
  .stop-scroll .top-list{
    height: 100%;
    overflow: hidden;
  }
  .top-list{
    padding: 10px;
    background: #eee;
    overflow: auto;
  }
</style>
<script>
  import mHeader from './header.vue'
  import topListItem from './top-list-item.vue'
  import songListPage from './childComponents/song-list-page.vue'
  import {mapState} from 'vuex'
  import {mapActions} from 'vuex'
  export default {
      props:{

      },
      components:{
          mHeader,
          topListItem,
          songListPage
      },
      data(){
          return {
          }
      },
      computed:{
        ...mapState({
          topListData(state){
              return state.topListData?state.topListData:[]
          },
          showSongListPage(state){
            return state.songListPage
          }
        })
      },
      methods:{
        toggleSongListPage(){
          this.showSongListPage = !this.showSongListPage
        },
        ...mapActions({
          getTopListData:'getTopListData'
        })
      },
      beforeMount(){
          this.getTopListData()
      }
  }
</script>
