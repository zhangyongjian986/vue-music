<template>
  <div id="app">

    <m-header v-model="select">
      <m-item title="推荐" id="/"></m-item>
      <m-item title="排行" id="rank"></m-item>
      <m-item title="搜索" id="search"></m-item>
    </m-header>
    <router-view class="router"></router-view>
    <audio-play v-show="isplaying !==null"></audio-play>
    <lyric v-show="showLyricPage"></lyric>
    <song-list-page v-show="getSongListPage" @showListPage="toggleSongListPage"></song-list-page>
    <alert :option="alertData"></alert>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import mHeader from './components/header.vue'
  import mItem from './components/headerItem.vue'
  import audioPlay from './components/childComponents/audio-play.vue'
  import lyric from './components/childComponents/lyric.vue'
  import songListPage from './components/childComponents/song-list-page.vue'
  import alert from './components/alert/alert.vue'
export default {
  name: 'app',
  data() {
    return {
        select:'recommend',
        alertData:{
         id:'alert1',
         width:280,
         height:210,
         title:'提示',
         context:'本项目主要基于移动端开发，在chrome移动端模式下浏览效果会更佳',
         delayed:2500
       }
    }
  },
  components:{
      mHeader,
      mItem,
      audioPlay,
      lyric,
      songListPage,
      alert
  },
  computed:{
    ...mapGetters(
        ['showLyricPage','getSongListPage','isplaying']
    )
  },
  methods: {
    toggleSongListPage(){
      this.showSongListPage = !this.showSongListPage
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html{
  font-size:16px;
}
::-webkit-scrollbar-track-piece {
  background-color:#f5f5f5;
  border-left:1px solid #d2d2d2;
}
::-webkit-scrollbar {
  width:1px;
  height:13px;
}
::-webkit-scrollbar-thumb {
  background-color:#c2c2c2;
  background-clip:padding-box;
  border:1px solid #979797;
  min-height:28px;
}
::-webkit-scrollbar-thumb:hover {
  border:1px solid #636363;
  background-color:#929292;
}
  .router{
  margin-top:3.75rem;
}
</style>
