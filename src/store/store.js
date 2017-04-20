import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/api.js'
import base64 from '../assets/lib/base64/base64'
import vueResource from 'vue-resource'
import mutation from './mutations'
import action from './actions'

Vue.use(Vuex)
Vue.use(vueResource)
function timeFormat(time) {
  var timeString = null
  var min = Math.floor(time/60)
  min = min>=10? min:'0'+min
  var second = Math.floor(time%60)
  second = second>=10? second: '0'+second
  timeString = min + ':' +second
  return timeString
}
export default new Vuex.Store({
  state:{
    showSearchPage:false,//是否显示搜索页
    LyricPage:false,//是否显示歌词页
    recommendData:null,//推荐的数据
    topListData: null,//排行榜数据
    songListData:null,//某个栏目的歌单数据，包括歌单、更新日期等，在某个栏目的歌单页面中显示
    songList:null,//某个栏目的歌单数据,仅仅包括歌单
    songListPage:false,//是否显示（某个栏目的歌单页面）
    songListId:null,//当前所显示的榜单的id
    playingSongListId:null,//当前播放的榜单的id，为了避免点击榜单页面的播放按钮时重复播放或不播放，同时用于
    playingSongsList:null,//正在播放的歌单
    currentSongLyric:null,//正在播放的歌词
    currentSongIndex:null,//正在播放的音乐在播放列表中的索引
    currentSongSrc:null,//正在播放的音乐的src
    currentTime:null,//当前播放时间
    currentTimeStr:null,//
    currentSongDuration:null,//正在播放的音乐的总时长
    singerStr:null,//当前歌曲所有歌手字符串
    songName:null,//当前歌曲名
    isplaying:null,//播放状态，暂停或播放
    audioWrap:false//是否显示播放控件，刚开始不显示
  },
  getters:{
    showLyricPage:state=>{
      return state.LyricPage
    },
    isplaying:state=>{
      switch (state.isplaying){
        case null:
          return null
          break
        case false:
          return false
          break
        case true:
          return true
          break
      }
    },
    isPlayingCurrentPage:state=>{
      return state.isplaying&&state.playingSongListId==state.songListId
    },
    getSongSrc:state=>{
      return state.currentSongSrc
    },
    getCurrentTimeStr:state=>{
      return timeFormat(state.currentTime)
    },
    getDurationStr:state=>{
      return timeFormat(state.currentSongDuration)
    },
    getSingerStr:state=>{
      return state.singerStr
    },
    getSongName:state=>{
      return state.songName
    },
    getSongListPage: state=>{
      return state.songListPage
    }
  },
  mutations:mutation/*{
    showSearch(state){//有待修改
      state.showSearchPage=true
    },
    hideSearch(state){//有待修改
      state.showSearchPage=false
    },
    changeLyricPage(state){
      state.LyricPage = !state.LyricPage
    },
    changeRecommendData(state,data){
      state.recommendData=data.data
    },
    changeTopListData(state,data){//排行榜不同歌单（排行榜数据）
      state.topListData = data.data.topList
    },
    changeSongListData(state,data){//某个榜单（歌单）的所有数据，包括歌单、更新日期等
      state.songListData = data
    },
    changSongList(state,data){
      state.songList = data
    },
    showSongListPage(state){//显示（某个栏目的歌单页面）
      state.songListPage=true
    },
    hideSongListPage(state){//隐藏（某个栏目的歌单页面）
      state.songListPage=false
    },
    changeSongListId(state,id){//改变为当前正显示的榜单的id,在点击进入某个榜单时异步获取到榜单数据后在回调函数中触发改变，点击榜单上的播放按钮时用来判断是否播放正在播放当前榜单
      state.songListId = id
    },
    changePlayingSongListId(state,id){//改变为当前正在播放的榜单的id，点击榜单上的播放按钮时触发用来判断是否播放当前榜单
      state.playingSongListId = state.songListId
    },
    changePlayingSongList(state,songlist){
      state.playingSongsList = songlist
    },
    changeCurrentSongLyric(state,lyric){
      let lyrs = []
      let fd = base64.decode(lyric).split('[')
      if(fd.length<=2){//没有歌词时只显示提示
        fd.slice(1).map(str=>{
          lyrs.push(str.split(']'))
        })
        state.currentSongLyric = lyrs
        return ;
      }
      let lyr = base64.decode(lyric).split('[').slice(6);
        lyr.map((val,i)=>{
          if(val.length<=10) lyr.splice(i,1)
        });
        lyr = lyr.map(str=>{
          lyrs.push(str.split(']'))
        })
      state.currentSongLyric = lyrs
    },
    changeCurrentSongIndex(state,index){
      state.currentSongIndex = index
    },
    changeCurrentSongSrc(state,src){
      state.currentSongSrc = src
    },
    changeIsPlaying(state){
      state.isplaying=!state.isplaying
    },
    updateCurrentTime(state,time){
      state.currentTime=time
    },
    updateDuration(state,time){
      state.currentSongDuration = time
    },
    updateSongName(state,name){
      state.songName = name
    },
    updateSingerStr(state,names){//这个方法可以和search.vue的获取歌手名的方法提取出来
      let nameArray=[];
      names.forEach(function (value) {
        nameArray.push(value.name)
      })
      state.singerStr = nameArray.join('/')
    },
    playOrPause(state,audio){//切换播放状态，暂停或播放
      if(state.isplaying) audio.pause()
      if(!state.isplaying) audio.play()
    }
  }*/,
  actions:action/*{
    getRecommendData({commit}){
      Vue.http.jsonp(api.recommend.url,{
        params:api.recommend.params(),
        jsonp:'jsonpCallback'
      }).then(function (res) {
        commit('changeRecommendData',res.body)
      })

    },
    getTopListData({commit}){
      Vue.http.jsonp(api.topList.url,{
        params:api.topList.params(),
        jsonp:'jsonpCallback'
      }).then(function (res) {
        commit('changeTopListData',res.body)
      })
    },
    getSongsList({commit},args){
      let type = args.type
      Vue.http.jsonp(api[type].url,{
        params:api[type].params(args.id),
        jsonp:'jsonpCallback'
      }).then(function (res) {
        let data = res.body.cdlist?res.body.cdlist[0] : res.body
        commit('changeSongListData',data)
        commit('changSongList',data.songlist)
        commit('showSongListPage')
        commit('changeSongListId',args.id)
      })
    },
    getCurrentSongLyric({commit},id){
      Vue.http.jsonp(api.songLyric.url(id),{
        jsonp:'callback'
      }).then(function (res) {
        commit('changeCurrentSongLyric',res.body.lyric)
      })
    },
    changeCurrentAll({commit,state,dispatch},index){//改变当前播放的所有信息，在榜单播放、下一首、上一首的方法中调用
      let songData = state.playingSongsList[index].data||state.playingSongsList[index]
      let songid = songData.songid || songData.id
      let singer = songData.singer
      let songName = songData.songname || songData.name
      commit('changeCurrentSongIndex',index)
      dispatch('getCurrentSongLyric',songid)
      commit('updateSongName',songName)
      commit('updateSingerStr',singer)
      commit('changeCurrentSongSrc',api.audioSrc.url(songid))
      if(!state.isplaying){
        commit('changeIsPlaying')
      }
    },
    /!*playSongList
    * 分为四种情况，一种是正在播放当前榜单且未暂停时即isplaying&&playingSongListId==songListId时切换播放状态未暂停
    * 一种是正在播放当前榜单且暂停即!isplaying&&playingSongListId==songListId时,只需将播放状态置为播放即可
    * 另一种是未播放当前榜单时且处于未播放状态，只需改变当前播放的榜单id和audio的src即可，当然其他操作此处不详写
    *最后一种是处于播放状态，但播放的不是当前榜单即isplaying&&playingSongListId!=songListId时，不需改变播放状态，只需更改src和当前播放的榜单ID,及其他操作即可，
    * 和第三种比基本一致，只是需要判断是否为处在播放状态，处于播放状态时不必改变为未播放，但未播放则需要改为播放
    * *!/
    playSongList({commit,state,dispatch},audio){
      if(state.isplaying&&state.songListId==state.playingSongListId) {
        commit('playOrPause',audio)
        commit('changeIsPlaying')
        return
      }
      if(!state.isplaying&&state.songListId==state.playingSongListId) {
        commit('playOrPause',audio)
        commit('changeIsPlaying')
        return
      }
      commit('changePlayingSongList',state.songList)//
      commit('changePlayingSongListId')//
      dispatch('changeCurrentAll',0)
    },
    prev({state,dispatch}){
      if(!state.playingSongsList) return
      let len = state.playingSongsList.length//当前播放列表的长度（歌曲数）
      let index = (state.currentSongIndex - 1)%len
      if(index<0) index = len-1
      dispatch('changeCurrentAll',index)
    },
    next({state,dispatch}){
      if(!state.playingSongsList) return
      let len = state.playingSongsList.length//当前播放列表的长度（歌曲数）
      let index = (state.currentSongIndex + 1)%len
      dispatch('changeCurrentAll',index)
    },
    playThis({commit,state,dispatch},data){
      let index = data.songIndex
      if(state.isplaying && state.currentSongIndex == index) return
      if((state.isplaying&&state.playingSongListId == state.songListId)||(!state.isplaying &&state.playingSongListId ==state.songListId)){
        dispatch('changeCurrentAll',index)
        return
      }
      if((state.isplaying&&state.playingSongListId != state.songListId) || (!state.isplaying && state.playingSongListId !=state.songListId)){
        commit('changePlayingSongList',state.songList)//
        commit('changePlayingSongListId')//
        dispatch('changeCurrentAll',index)
      }
    }
  }*/
})
