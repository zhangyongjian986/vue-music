<template>
  <div class="top-list-item" :data-id="item.id" @click="commitGetSongsList({type:songListType,id:item.id})">
    <div class="top-list-item-img">
      <img :src="item.picUrl">
      <span>
        <i></i>
        {{listenCount(item.listenCount)}}
      </span>
    </div>
    <div class="top-list-item-list">
      <div class="top-list-item-title">{{item.topTitle}}</div>
      <p v-for="(song,index) in item.songList">
        <span class="song-index">{{index+1}}</span>
        <span class="song-name">{{song.songname}}</span>
        <span class="singer">-{{song.singername}}</span>
      </p>
      <i class="arrow-right"></i>
    </div>
  </div>

</template>
<style lang="less">
  @import url('../style/mixin');
  .top-list-item{
    .flex-display(row);
    background: @whiteColor;
    margin-bottom: 10px;
    &:nth-last-child(1){
      margin-bottom: 4.375rem;
    }
    .top-list-item-img{
      width: 7.375rem;
      height: 7.375rem;
      position: relative;
      text-align: center;
      img{
        height: 100%;
      }
      span{
        position: absolute;
        bottom: 5px;
        opacity: .6;
        .font-size(@whiteColor,12px);
        width: 100%;
        left: 0;
        text-align: center;
        vertical-align:middle;
        i{
          display: inline-block;
          width: 10px;
          height: 10px;
          margin-right: 5px;
          background: url("https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/list_sprite.png?max_age=19830212&d=20151105145423")no-repeat 0 -50px;
          background-size:  24px 60px;
        }
      }
    }
    .top-list-item-list{
      flex:1;
      padding: 5px 8px 5px 10px;
      position: relative;
      .flex-display(column);
      justify-content: space-around;
      overflow: hidden;
      .top-list-item-title{
        text-align: left;
        font-weight: 400;
        color: #000;
        .text-ellip();
      }
      p{
        margin: 5px 0;
        text-align: left;
        font-size: 14px;
        min-width:100%;
        .text-ellip();
        .song-index{
          color: #aaa;
        }
        .song-name{
          color: #000;
        }
        .singer{
          color: #aaa;
        }
    }
      i{
        position: absolute;
        top: 50%;
        display: inline-block;
        width: 6px;
        height: 6px;
        right: 10px;
        border-bottom: 1px solid #ddd;
        border-right: 1px solid #ddd;
        transform: rotate(-45deg);
      }
    }
  }
</style>
<script>
  import {mapActions} from 'vuex'
  export default {
      props:{
          item:{
              type:Object,
              default:''
          }
      },
      data(){
       return {
           songListType: 'topListSongs'
       }
      },
      methods:{
          listenCount(val){
              return ((parseInt(val))/10000).toFixed(1)+'万'
          },
          commitGetSongsList(obj){
              this.getSongsList(obj)
          },
        ...mapActions(
            [
                'getSongsList'
            ]
        )
      },
    beforeMounted(){

    }
  }
</script>
