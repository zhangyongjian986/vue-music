<template>
  <div class="container">
    <swiper :sliders="getSliders"></swiper>
    <div class="recommend-container">
     <!-- <recommend-item :list="getRadioList" title="电台"></recommend-item>-->
      <recommend-item :list="getSongList" :songListType="type" title="热门歌单"></recommend-item>
    </div>
   <!-- <song-list-page v-show="showSongListPage" @showListPage="toggleSongListPage"></song-list-page>-->
  </div>
</template>
<style scoped="" lang="less">
  .recommend-container{
    margin-bottom: 4.4rem;
  }
</style>
<script>
  import {mapMutations} from 'vuex'
  import {mapState} from 'vuex'
  import {mapActions} from 'vuex'
  import mHeader from './header.vue'
  import swiper from './swiper.vue'
  import searchBar from './search-bar.vue'
  import searchPage from './search.vue'
  import recommendItem from './recommend-item.vue'
  import songListPage from './childComponents/song-list-page.vue'

  export default {
    props:{

    },
    components:{
        mHeader,
        swiper,
        searchPage,
        searchBar,
        recommendItem,
        songListPage
    },
    data(){
        return {
            sliders:[
              {name:'1',src:'http://p4.music.126.net/Mbm-Z_LrenuzoJLu8xYgsQ==/18987466300120411.jpg'},
              {name:'2',src:'http://p3.music.126.net/4TNMEHUMglCA_Pbt-sESGA==/19234856416369202.jpg'},
              {name:'3',src:'http://p3.music.126.net/EbzVKS5EDCy0SOuwGPrGUg==/18917097555941790.jpg'}
            ],
            type:'hotSongs',
            showSongListPage:false
        }
    },
    methods:{
      ...mapMutations({
        showSearch:'showSearch',
        hideSearch:'hideSearch'
      }),
      ...mapActions({
        getRecommendData:'getRecommendData'
      })
    },
    computed:{
      ...mapState({
        getSliders(state){
          return state.recommendData?state.recommendData.slider:this.sliders
        },
        getSongList(state){
          return state.recommendData?state.recommendData.songList:[]
        },
        getRadioList(state){
          return state.recommendData?state.recommendData.radioList:[]
        },
        showSearchPage(state){
            if(state.showSearchPage){
                return state.showSearchPage
            }
        }
      })
    },
    beforeMount(){
      this.getRecommendData()
    }
  }
</script>
