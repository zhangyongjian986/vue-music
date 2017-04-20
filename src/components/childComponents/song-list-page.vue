<template>
  <div class="song-list-page" :style="{backgroundColor:getBackground}">
    <div class="page-top">
      <div class="page-top-return" @click="hideSongListPage">
        <i></i>
      </div>
      <div class="page-top-img">
        <img :src="songListData?songListData.logo||songListData.topinfo.pic_album:''">
      </div>
      <div class="page-top-info">
        <div class="page-top-info-name">
         {{songListData?songListData.dissname||songListData.topinfo.ListName:''}}
        </div>
        <div class="page-top-info-date">
          {{songListData?songListData.update_time:''}} 更新
        </div>
        <div class="page-top-play-button" :class="isPlayingCurrentPage?'page-top-pause':'page-top-play'" @click="commitPlaySongList">
        </div>
      </div>
    </div>
    <div class="page-list">
      <div class="page-list-item" v-for="(item,index) in songList" :data-songid="item.id||item.data.songid" @click="commitPlaythis(item.id||item.data.songid,index)">
        <div class="page-list-item-no">{{index+1}}</div>
        <div class="page-list-item-info">
          <h4>{{item.name||item.data.songname}}</h4>
          <p>{{singers(item.singer||item.data.singer)}} · {{item.album?item.album.name:item.data.albumname}} · {{item.data?item.data.albumdesc:''}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
  @import url('../../style/mixin');
  .song-list-page{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    background: rgb(89,60,90);
    .fix-position(0,0,auto,0);
    z-index:3;
    .page-top{
      width:100%;
      position: relative;
      .page-top-return{
        .fix-position(0,0,auto,0);
        text-align: left;
        text-indent: 10px;
        padding-top: 10px;
        background: #000000;
        opacity: 0.6;
        i{
          display: inline-block;
          width:26px;
          height: 26px;
          .backgroundImg('return.png',cover);
        }
      }
      .page-top-img{
        width: 100%;
        img{
          width: 100%;
        }
      }
      .page-top-info{
        position: absolute;
        right: 0;
        left: 0;
        bottom: 0;
        height: 5.125rem;
        color: @whiteColor;
        background: rgb(0,0,0);
        opacity: 0.7;
        text-align: left;
        padding-left: 1rem;
        .page-top-info-name{
          font-size: 24px;
          width: 70%;
          max-height: 3.875rem;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .page-top-play-button{
          position: absolute;
          right:2rem;
          top:1rem;
          width:3rem;
          height: 3rem;
          border: 3px solid @whiteColor;
          border-radius: 50%;
        }
        .page-top-play{
          &:before{
            position: absolute;
            content: "";
            width: 0;
            height: 0;
            top: 1rem;
            left: 18px;
            line-height: 999rem;
            overflow: hidden;
            border-width: 9px 15px;
            border-style: solid;
            border-color: transparent transparent transparent currentColor;
          }
        }
        .page-top-pause{
          &:before{
            position: absolute;
            content: "";
            width: 6px;
            height: 23px;
            top: 0.8rem;
            left: 18px;
            line-height: 999rem;
            overflow: hidden;
            border-left: 4px solid @whiteColor;
            border-right:4px solid @whiteColor;
          }
        }
      }
    }
    .page-list-item{
      height: 3.75rem;
      display: flex;
      .page-list-item-no{
        width:14.28%;
        line-height: 3.75rem;
        color: @whiteColor;
      }
      .page-list-item-info{
        width:85.71%;
        text-align: left;
        h4{
          margin: 0;
          margin-top: .625rem;
          color: @whiteColor;
          font-weight:400;
          .text-ellip();
        }
      p{
        margin: 0;
        .font-size(#ccc,14px);
        .text-ellip();
      }
      }
    }
  }
</style>
<script>
  import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
  import $ from 'jquery'
  function calculateBg(n) {//十进制颜色转换为十六进制颜色
    function t(n) {
      return n > 16 ? n.toString(16) : "0" + n.toString(16)
    }
      var o = (16711680 & n) >> 16,
          i = (65280 & n) >> 8,
          a = 255 & n;
      if (!(o < 0 || i < 0 || a < 0 || o > 255 || i > 255 || a > 255)) {
        var e = .299 * o + .587 * i + .114 * a;
        /*e >= 192 && $("<link>").attr({
          rel: "stylesheet",
          type: "text/css",
          href: "//y.gtimg.cn/mediastyle/mobile/app/share/index_light.css?max_age=604800"
        }).appendTo("head");
        var s = t(o) + t(i) + t(a);
        $(".c_bg1").css({
          "background-color": "#" + s
        }), $(".c_gradient").css({
          color: "#" + s
        })*/
        var s = t(o) + t(i) + t(a);
        return s
      }

  }

  export default {
      props:{

      },
      computed:{
        ...mapState({
          songListData(state){
              return state.songListData
          },
          songList(state){
              return state.songList
          },
          getBackground(state){
              var a = state.songListData?calculateBg(state.songListData.color):''
              return '#'+a
             // return a
          }
        }),
        ...mapGetters([
          'isPlayingCurrentPage'
        ])
      },
      methods:{
          commitPlaythis(id,index){
              this.playThis({songId:id,songIndex:index})
          },
          singers(names){
            var nameArray=[];
            names.forEach(function (value) {
              nameArray.push(value.name)
            })
            return nameArray.join('/')
          },
        commitPlaySongList(){
              var audio = document.getElementsByTagName('audio')[0]
              this.playSongList(audio)
        },
        ...mapMutations(
            [
                'hideSongListPage'
            ]
        ),
        ...mapActions({
          playSongList:'playSongList'
        }),
        ...mapActions(
            ['playThis']
        )
      }
  }
</script>
