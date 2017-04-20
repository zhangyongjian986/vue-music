<template>
  <div>
    <div class="audio-playlist" v-show="plsyListPage">
      <h6>播放队列</h6>
      <div class="audio-playlist-content">
        <ul id="playlist">
          <li v-for="(item,index) in playingSongsList" @click="commitPlaythis(item.id || item.data.songid,index)" :class="{'cur':isthis(index)}">
            <span class="song-name">{{item.name||item.data.songname}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="audio-wrap" @click="changeLyricPage">
      <audio :src="getSongSrc" autoplay="autoplay" @timeupdate="playing" @durationchange="commitUpdateDuration" @ended="next">您的浏览器不支持audio标签</audio>

      <div class="audio-progress-wrap">
        <div class="audio-progress" :style="{width:progressWidth}">
          <div class="audio-progress-button"></div>
        </div>
      </div>
      <div class="audio-progress-time">
        <span class="play-time">{{getCurrentTimeStr}}</span><span class="total-time">{{getDurationStr}}</span>
      </div>
      <div class="audio-control">
        <div class="playing-song-info">
          <p>{{getSongName}}</p>
          <p>{{getSingerStr}}</p>
        </div>
        <div class="audio-control-buttons">
          <div class="pre-button" @click.stop="prev">
            <i></i>
          </div>
          <div class="play-pause" @click.stop="commitPlayOrPause">
            <i :class="isplaying?'playing':'paused'"></i>
          </div>
          <div class="next-button" @click.stop="next">
            <i></i>
          </div>
        </div>
        <div class="audio-control-playlist" @click.stop="showPlayList">
          <i ></i>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
  @import url('../../style/mixin');
  @this-baseImg:'../../assets/img/';
  .audio-playlist{
    .fix-position(auto,0,4.4rem,0);
    height: 18.75rem;
    opacity: .95;
    background: url("@{this-baseImg}body-bg.7f43813.jpg");
    z-index: 1000;
    color: @whiteColor;
    h6{
      position: relative;
      height: 50px;
      font-size: 16px;
      margin: 5px 0;
      line-height: 50px;
      &:after{
        .pxborder(rgba(255,255,255,0.3),0)
      }
    }
    .audio-playlist-content{
      ul{
        max-height: 14.375rem;
        overflow-y: scroll;
        margin: 0;
        padding:0;
        li{
          position: relative;
          height: 45px;
          line-height: 45px;
          list-style: none;
          text-align: left;
          text-indent:1rem;
          font-size: 16px;
          &:after{
            .pxborder(rgba(255,255,255,0.3),10px)
          }
          .song-name{
            display: inline-block;
            max-width: 90%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .cur{
          color:#31c27c;
        }
      }
    }
  }
  .audio-wrap{
    .fix-position(auto,0,0,0);
    height: 4.4rem;
    background: url("@{this-baseImg}body-bg.7f43813.jpg");
    z-index: 999;
    color: @whiteColor;
    audio{
      height: 0;
    }
    .audio-control{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 2.9rem;
      display: flex;
      .playing-song-info{
        width: 55%;
        p{
          margin: 0;
          text-align: left;
          text-indent: 1.25rem;
          /*多余文字隐藏*/
          .text-ellip();
        }
        p:nth-child(1){
          font-size: 14px;
        }
        p:nth-child(2){
          .font-size(#c2c8d2,12px);
        }
      }
      .audio-control-buttons{
        width: 30%;
        .flex-display(row);
        i{
          display: inline-block;
          width: 1.8rem;
          height: 2.3rem;
        }
        .pre-button{
          flex: 1;

          i{
            .backgroundImg('icon-step-backward.png',cover);
          }
        }
        .play-pause{
          flex: 1;
          .paused{
            .backgroundImg('icon-pauseClass.png',contain);
          }
          .playing{
            .backgroundImg('icon-playing.png',contain);
          }
        }
        .next-button{
          flex: 1;
          i{
            .backgroundImg('icon-step-forward.png',contain);
          }
        }
      }
      .audio-control-playlist{
        width: 15%;
        i{
          display: inline-block;
          width: 24px;
          height: 18px;
          .backgroundImg('play-list.png',contain);
          margin-top: 10px;
        }
      }
    }
    .audio-progress-wrap{
      position: absolute;
      top: 0.2rem;
      left: 0.625rem;
      right: 0.625rem;
      height: 0.25rem;
      background: #bbb;
      .audio-progress{
        height: 100%;
        width: 0;
        background: @whiteColor;
        .audio-progress-button{
          position: relative;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: @whiteColor;
          top:-3px;
          left:100%;
        }
      }
    }
    .audio-progress-time{
      position: absolute;
      top:0.5rem;
      width: 100%;
      height: 0.75rem;
      display: flex;
      span{
        flex: 1;
      }
      .play-time{
        text-indent: 12px;
        text-align: left;
      }
      .total-time{
        text-align: right;
        padding-right: 1rem;
      }
    }
  }
</style>
<script>
  import {mapGetters,mapState,mapMutations,mapActions} from 'vuex'
  function timeFormat(time) {
      var timeString = null
      var min = Math.floor(time/60)
      min = min>=10? min:'0'+min
      var second = Math.floor(time%60)
      second = second>=10? second: '0'+second
      timeString = min + ':' +second
      return timeString
  }
  export default {
      props:{

      },
      data(){
        return {
            plsyListPage:false
        }
      },
      computed:{
        ...mapState({
          progressWidth(state){
              return (state.currentTime/state.currentSongDuration)*100 +'%'
          },
          playingSongsList(state){
              return state.playingSongsList
          }
        }),
        ...mapGetters([
          'isplaying',
          'getSongSrc',
          'getCurrentTimeStr',
          'getDurationStr',
          'getSingerStr',
          'getSongName'
        ])
      },
    methods:{
      playing(e){
          var time =e.target.currentTime
          this.updateCurrentTime(time)
      },
      isthis(index){
        return this.$store.state.currentSongIndex == index
      },
      commitPlaythis(id,index){
          this.playThis({songId:id,songIndex:index})
      },
      showPlayList(e){
          this.plsyListPage = !this.plsyListPage
          let self = this//下面这样做是为了在展开播放列表后跳到当前正在播放的项，之所以加个延时是因为将播放列表页显示出来需要一定时间
          setTimeout(function(){document.getElementById('playlist').scrollTop = self.$store.state.currentSongIndex * 45},10)
      },
      commitUpdateDuration(e){
          this.updateDuration(e.target.duration)
      },
      commitPlayOrPause(){
          var audio = document.getElementsByTagName('audio')[0];
          if(audio.src && audio.src != null){
            this.playOrPause(audio)
            this.changeIsPlaying()
          }
      },
      ...mapMutations(
        ['playOrPause','changeIsPlaying','updateCurrentTime','updateDuration','changeLyricPage']
      ),
      ...mapActions({
        next:'next',
        prev:'prev',
        playThis:'playThis'
      })
    }
  }
</script>
