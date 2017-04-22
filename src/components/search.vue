<template>
  <div class="searchPage">
    <div class="searchPage-top">
    </div>
    <div class="searchPage-input">
      <div class="searchPage-input-left"></div>
      <div class="search">
        <input id="search-input" type="search" placeholder="搜索歌手、歌曲、专辑..." @keyup.enter="startSearch">
      </div>
      <div class="searchPage-input-right">

      </div>
    </div>
    <div class="hotkeys-content" v-show="!showResult">
      <h5>热门搜索</h5>
      <span @click.stop="changeSearch" class="special">{{getSpecialKey}}</span>
      <span v-for="item in getHotkeys" @click.stop="changeSearch">{{item.k}}</span>
    </div>
    <div class="search-results" v-show="showResult">
      <ul class="search-result-content">
        <li v-for="item in results" class="search-result-item" @click.stop="playThis(item.songid,item.songname,item.singer)">
          <i></i>
          <h5>{{item.songname}}</h5>
          <p>{{SingerStr(item.singer)}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="less">
  @import url('../style/mixin.less');
  @baseImg:'../assets/img/';
  .searchPage{
    .fix-position(0,0,auto,0);
    .flex-display(column);
    width:100%;
    height: 100%;
    .backgroundImg('body-bg.7f43813.jpg',cover);
    z-index: 2;
    .searchPage-top{
      .flex-display(row);
      flex: .5;
      width:100%;
      .font-size(@whiteColor,20px);
      font-weight: 400;
      .return{
        float: left;
        text-indent: 1rem;
        flex: .5;
        text-align: left;
        cursor: pointer;
      }
      .searchPage-title{
        float: left;
        flex: 1;
        text-align:center;
      }
      .searchPage-right{
        flex: .5;
      }
    }
    .searchPage-input{
      height:100%;
      flex: .5;
      .flex-display(row);
      .font-size(@whiteColor,20px);
      .searchPage-input-left{
        flex: 1;
      }
      .search{
        flex: 5;
        input{
          height: 100%;
          width: 90%;
          border:none;
          border-radius:8px;
          outline:none;
          text-align: left;
          text-indent: 20px;
          background:@whiteColor;
        }
      }
      .searchPage-input-right{
        flex: 1;
        .font-size(@whiteColor,16px);
        .flex-display(column);
        align-content: center;
        justify-content: space-around;
      }
    }
    .hotkeys-content{
      margin-top: 1.5rem;
      padding: 10px 10px;
      text-align: left;
      color: @whiteColor;
      flex: 6;
      h5{
        margin-top: 0;
      }
      span{
        display: inline-block;
        height: 30px;
        line-height: 30px;
        border-style: solid;
        border-width: 1px;
        border-radius: 99px;
        margin: 5px 5px;
        padding: 0 10px;
        font-size: 14px;
        word-break: keep-all;
      }
      .special{
        color: #fc4524;
        border-color:#fc4524;
      }
    }
    .search-results{
      flex: 6;
      overflow-y: scroll;
      margin-top: 1.5rem;
      .search-result-content{
        padding: 0;
        margin: 0;
        text-align: left;
        overflow-y: scroll;
        .search-result-item{
          position: relative;
          list-style: none;
          padding-left: 3.4375rem;
          height: 3.4378rem;
          &:after{
            .pxborder(@color:rgba(255,255,255,0.3),0)

          }
          i{
            display: inline-block;
            width: 1.375rem;
            height: 1.25rem;
            position: absolute;
            left:1.25rem;
            top:1rem;
            background: url("@{baseImg}search_sprite.png")no-repeat;
            background-size: 22px 30px;
          }
          h5{
            margin: 12px 0 0 0;
            .font-size(@whiteColor,16px);
            font-weight: 400;
            .text-ellip()
          }
          p{
            margin: 12px 0 0 0;
            .font-size(#ddd,12px);
          }
        }
      }
    }
  }
</style>
<script>
  import {mapMutations} from 'vuex'
  import api from '../api/api'
  import $ from 'jquery'
  export default {
      data(){
        return {
            hotkeys:null,
            results:[],
            showResult:false
        }
      },
      computed:{
        getSpecialKey(){
            return this.hotkeys?this.hotkeys.special_key:''
        },
        getHotkeys(){
            if(this.hotkeys === null) return []
            let obj = {}
            let hotkeys = []
            let thisHotkeys = this.hotkeys.hotkey
            let len = thisHotkeys.length
            for(let i =0;i<7;){//随机取7个热词
                let randomNum = Math.floor(Math.random()*len)
                if(!obj[randomNum]){
                    obj[randomNum] = true
                    hotkeys.push(thisHotkeys[randomNum])
                    ++i
                }
            }
            return this.hotkeys?hotkeys:[]
        }
      },
      methods:{
        commitHideSearch(){
            this.showResult = false
            this.hideSearch()
        },
        startSearch(){
          let input = document.getElementById('search-input')
          let key = input.value
          if (key=='')return
          input.blur()
          this.$http.jsonp(api.searchUrl.url,{
            params:api.searchUrl.params(key),
            jsonp:'jsonpCallback'
          }).then(function (res) {
            this.results = res.body.data.song.list
            this.showResult = true
          })
        },
        changeSearch(e){
            let key = event.target.innerHTML
            let input = document.getElementById('search-input')
            input.value = key
            this.startSearch()
        },
        SingerStr(names){//这个方法可以和store的获取歌手名的方法提取出来
          let nameArray=[];
          names.forEach(function (value) {
            nameArray.push(value.name)
          })
          return nameArray.join('/')
        },
        playThis(id,songName,singer){
          this.$store.dispatch('getCurrentSongLyric',id)
          this.$store.commit('updateSongName',songName)
          this.$store.commit('updateSingerStr',singer)
          this.$store.commit('changeCurrentSongSrc',api.audioSrc.url(id))
          if(!this.$store.state.isplaying){
            this.$store.commit('changeIsPlaying')
          }
        },
        ...mapMutations(
            ['hideSearch']
        )
      },
      created(){
          let self = this
          this.$http.jsonp(api.getHotKey.url,{
              params:api.getHotKey.params(),
              jsonp:'jsonpCallback'
          }).then(function (res) {
            this.hotkeys = res.body.data
          })
      }
  }
</script>
