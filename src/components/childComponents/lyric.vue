<template>
  <div class="audio-lyric">
    <div class="audio-lyric-title">
      <span @click.stop="changeLyricPage" class="audio-lyric-return">
        <i></i>
      </span>
      <span class="audio-lyric-title-name-container">
        <span class="audio-lyric-title-name">{{getSongName}}</span>
      </span>
      <span class="placeholder"></span>
    </div>
    <div class="audio-lyric-content">
      <div id="audio-lyric-content-transform" style="">
        <p class="audio-lyric-item" :class="data[2]" v-for="data in ComputedCurrentSongLyric">{{data[1]}}</p>
      </div>

    </div>
  </div>
</template>
<style lang="less" scoped>
  @import url('../../style/mixin');

  .audio-lyric{
    .fix-position(0,auto,4.3rem,auto);
    width: 100%;
    z-index: 999;
    .backgroundImg('body-bg.7f43813.jpg',cover);
    font-size: 14px;
    .flex-display(column);
    .audio-lyric-title{
      display: flex;
      width: 100%;
      flex: 1;
      font-size: 18px;
      .font-size(@whiteColor,18px);
      &:after{/*将文字垂直居中*/
        .text-center;
      }
      .audio-lyric-return{
        display: inline-block;
        flex: 1;
        height: 100%;
        &:after{/*将文字垂直居中*/
          .text-center;
        }
        i{
          display: inline-block;
          height: 26px;
          width: 26px;
          .backgroundImg('return.png',contain);
        }
      }
      .audio-lyric-title-name-container{
        display: inline-block;
        flex: 9;
        height: 100%;
        overflow: hidden;
        position: relative;
        .audio-lyric-title-name{
          .vertical-center(absolute);
          left:0;
          white-space: nowrap;
          animation: scoll 5s linear infinite;
          text-align: center;
        }
        @keyframes scoll{
          from{
            left:2.5rem;
          }
          to{
            left:-6.25rem;
          }
        }
      }
      .placeholder{
        display: inline-block;
        flex: 1;
        height: 100%;
      }
    }
    .audio-lyric-content{
      width: 100%;
      flex: 9;
      overflow: hidden;
      position: relative;
      #audio-lyric-content-transform{
        position: absolute;
        left:0;
        right: 0;
        transition: transform 0.3s ease-out;
        transform-origin: 0px 0px 0px;
      }
      .cur{
        color: @whiteColor;
      }
    }
  }
</style>
<script>
  import $ from 'jquery'
  import {mapState,mapGetters,mapMutations} from 'vuex'
  export default {
      props:{

      },
      data(){
          return {

          }
      },
      computed:{
        ... mapState(
          ['currentSongLyric']
        ),
        ...mapGetters(
            ['getSongName']
        ),
        ...mapState({
          ComputedCurrentSongLyric(state){
              let lyrics = state.currentSongLyric
              let time = state.currentTime
              if(lyrics===null) return
              let len = lyrics.length
              var ele = document.getElementById('audio-lyric-content-transform')
            for(let i=0;i<len;i++){//动态歌词
                  lyrics[i][2]=''
              //debugger
                  let currentLyric = lyrics[i]
                  let nextLyric = lyrics[i+1]||lyrics[i]
                  let nextTime = nextLyric[0].split(':')
                  let dataTime = currentLyric[0].split(':')
                  let currentDataTime = parseInt(dataTime[0])*60 + parseFloat(dataTime[1])
                  let nextDataTime = parseInt(nextTime[0])*60 + parseFloat(nextTime[1])
                  if(currentDataTime<=time && nextDataTime>time){
                      lyrics[i][2]='cur'
                      ele.style.transform = 'translate3d(0px,'+30*(-i) +'px, 0px)'
                  }else if(currentDataTime==nextDataTime &&time>=currentDataTime){
                    lyrics[i][2]='cur'
                    if(len<=1){
                      ele.style.transform = 'translate3d(0px,'+30*(-i) +'px, 0px)'
                    }
                  }
            }
            return lyrics
          }
        })

      },
      methods:{
        ...mapMutations(['changeLyricPage'])
      }

  }
</script>
