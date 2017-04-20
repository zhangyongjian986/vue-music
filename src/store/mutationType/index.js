/*function keyMirror(obj) {
  debugger
  if(obj instanceof Object){
    let _obj = Object.assign({},obj)
    let keyArr = Object.keys(_obj)
    keyArr.forEach(key => {
      _obj[key] = key
    })
    return _obj
  }
}
const types = {
  showSearch:null,
  hideSearch:null,
  changeLyricPage:null,
  changeRecommendData:null,
  changeTopListData:null,
  changeSongListData:null,
  changSongList:null,
  showSongListPage:null,
  hideSongListPage:null,
  changeSongListId:null,
  changePlayingSongListId:null,
  changePlayingSongList:null,
  changeCurrentSongLyric:null,
  changeCurrentSongIndex:null,
  changeCurrentSongSrc:null,
  changeIsPlaying:null,
  updateCurrentTime:null,
  updateDuration:null,
  updateSongName:null,
  updateSingerStr:null,
  playOrPause:null
}*/


  export const showSearch='showSearch'
  export const hideSearch= 'hideSearch'
  export const changeLyricPage='changeLyricPage'
  export const changeRecommendData='changeRecommendData'
  export const changeTopListData='changeTopListData'
  export const changeSongListData='changeSongListData'
  export const changSongList='changSongList'
  export const showSongListPage='showSongListPage'
  export const hideSongListPage='hideSongListPage'
  export const changeSongListId='changeSongListId'
  export const changePlayingSongListId='changePlayingSongListId'
  export const changePlayingSongList='changePlayingSongList'
  export const changeCurrentSongLyric='changeCurrentSongLyric'
  export const changeCurrentSongIndex='changeCurrentSongIndex'
  export const changeCurrentSongSrc='changeCurrentSongSrc'
  export const changeIsPlaying='changeIsPlaying'
  export const updateCurrentTime='updateCurrentTime'
  export const updateDuration='updateDuration'
  export const updateSongName='updateSongName'
  export const updateSingerStr='updateSingerStr'
  export const playOrPause='playOrPause'

