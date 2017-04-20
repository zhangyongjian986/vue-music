import api from '../../api/api'
import  Vue from 'vue'
import vueResource from 'vue-resource'

Vue.use(vueResource)

import {
  changeRecommendData,
  changeTopListData,
  changeSongListData,
  changSongList,
  showSongListPage,
  changeSongListId,
  changeCurrentSongLyric,
  changeCurrentSongIndex,
  getCurrentSongLyric,
  updateSongName,
  updateSingerStr,
  changeCurrentSongSrc,
  changeIsPlaying,
  playOrPause,
  changePlayingSongList,
  changePlayingSongListId,
  changeCurrentAll,
} from '../mutationType'

export default {
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
  /*playSongList
   * 分为四种情况，一种是正在播放当前榜单且未暂停时即isplaying&&playingSongListId==songListId时切换播放状态未暂停
   * 一种是正在播放当前榜单且暂停即!isplaying&&playingSongListId==songListId时,只需将播放状态置为播放即可
   * 另一种是未播放当前榜单时且处于未播放状态，只需改变当前播放的榜单id和audio的src即可，当然其他操作此处不详写
   *最后一种是处于播放状态，但播放的不是当前榜单即isplaying&&playingSongListId!=songListId时，不需改变播放状态，只需更改src和当前播放的榜单ID,及其他操作即可，
   * 和第三种比基本一致，只是需要判断是否为处在播放状态，处于播放状态时不必改变为未播放，但未播放则需要改为播放
   * */
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
}
