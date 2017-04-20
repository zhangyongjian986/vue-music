import base64 from '../../assets/lib/base64/base64'
import {
  showSearch,
  hideSearch,
  changeLyricPage,
  changeRecommendData,
  changeTopListData,
  changeSongListData,
  changSongList,
  showSongListPage,
  hideSongListPage,
  changeSongListId,
  changePlayingSongListId,
  changePlayingSongList,
  changeCurrentSongLyric,
  changeCurrentSongIndex,
  changeCurrentSongSrc,
  changeIsPlaying,
  updateCurrentTime,
  updateDuration,
  updateSongName,
  updateSingerStr,
  playOrPause
} from '../mutationType'

export default {
  [showSearch](state){//有待修改
    state.showSearchPage=true
  },
  [hideSearch](state){//有待修改
    state.showSearchPage=false
  },
  [changeLyricPage](state){
    state.LyricPage = !state.LyricPage
  },
  [changeRecommendData](state,data){
    state.recommendData=data.data
  },
  [changeTopListData](state,data){//排行榜不同歌单（排行榜数据）
    state.topListData = data.data.topList
  },
  [changeSongListData](state,data){//某个榜单（歌单）的所有数据，包括歌单、更新日期等
    state.songListData = data
  },
  [changSongList](state,data){
    state.songList = data
  },
  [showSongListPage](state){//显示（某个栏目的歌单页面）
    state.songListPage=true
  },
  [hideSongListPage](state){//隐藏（某个栏目的歌单页面）
    state.songListPage=false
  },
  [changeSongListId](state,id){//改变为当前正显示的榜单的id,在点击进入某个榜单时异步获取到榜单数据后在回调函数中触发改变，点击榜单上的播放按钮时用来判断是否播放正在播放当前榜单
    state.songListId = id
  },
  [changePlayingSongListId](state,id){//改变为当前正在播放的榜单的id，点击榜单上的播放按钮时触发用来判断是否播放当前榜单
    state.playingSongListId = state.songListId
  },
  [changePlayingSongList](state,songlist){
    state.playingSongsList = songlist
  },
  [changeCurrentSongLyric](state,lyric){
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
  [changeCurrentSongIndex](state,index){
    state.currentSongIndex = index
  },
  [changeCurrentSongSrc](state,src){
    state.currentSongSrc = src
  },
  [changeIsPlaying](state){
    state.isplaying=!state.isplaying
  },
  [updateCurrentTime](state,time){
    state.currentTime=time
  },
  [updateDuration](state,time){
    state.currentSongDuration = time
  },
  [updateSongName](state,name){
    state.songName = name
  },
  [updateSingerStr](state,names){//这个方法可以和search.vue的获取歌手名的方法提取出来
    let nameArray=[];
    names.forEach(function (value) {
      nameArray.push(value.name)
    })
    state.singerStr = nameArray.join('/')
  },
  [playOrPause](state,audio){//切换播放状态，暂停或播放
    if(state.isplaying) audio.pause()
    if(!state.isplaying) audio.play()
  }
}
