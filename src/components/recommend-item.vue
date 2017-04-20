<template>
  <div class="recommend-item">
    <div class="recommend-item-title" v-text="title"></div>
    <div v-for="item in list" class="recommend-list-item">
      <a :data-id="item.id||item.radioid" @click="commitGetSongsList({type:songListType,id:item.id||item.radioid})">
        <div>
          <img :src="item.picUrl">
        </div>
        <div class="recommend-item-info">
          <h3 class="recommend-list-item-title" v-text="item.Ftitle||item.songListDesc"></h3>
          <p class="recommend-list-item-name" v-text="item.songListAuthor"></p>
        </div>

      </a>

    </div>

  </div>
</template>
<style lang="less">
  @import url('../style/mixin');
.recommend-item{
  width:100%;
  background: #eee;
  display: table;
  .recommend-item-title{
    height:2.5rem;
    line-height: 2.5rem;
    font-size: 18px;
    text-align: left;
    text-indent: 1.25rem;
  }
  .recommend-list-item{
    width: 49%;
    float: left;
    margin-right: 1%;
    background: #fff;
    img{
      width: 100%;
    }
    .recommend-item-info{
      padding: 0 5px;
      text-align: left;
      h3{

        font-size: 14px;
        .text-ellip();
        margin: 0;

      }
      p{
        font-size: 12px;
        margin: 0;
        min-height: 16px;
      }
    }
  }
  .recommend-list-item:nth-child(2n+1){
    margin-right: 0;
  }
}
</style>
<script>
  import {mapActions} from 'vuex'
  export default {
      props:{
          list:{
              type:Array,
              default:''
          },
        title:{
              type:String,
              default:''
        },
        songListType:{
              type: String,
              default: ''
        }
      },
    methods:{
          showSongList(id){
          },
          commitGetSongsList(obj){
              this.getSongsList(obj)
          },
      ...mapActions(
          [
              'getSongsList'
          ]
      )
    }
  }
</script>
