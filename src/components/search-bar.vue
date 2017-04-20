<template>
  <div class="searchbar">
    <input @click="search" placeholder="搜索歌手、歌曲、专辑...">
  </div>
</template>
<style lang="less">
  .searchbar{
    height:2.5rem;
    margin-top: 0.625rem;
    input{
      height: 2.5rem;
      background: #ddd;
      width:90%;
      border-radius: 50px;
      font-size:20px;
      text-align:center;
      border:0;
    }
    i{
      display:inline-block;
      width:1.625rem;
      height:1.625rem;
      font-family: mintui!important;
      &:before{
        content: '\E604';
      }
    }
  }


</style>
<script>
  export default {
      data(){
          return {

          }
      },
      methods:{
          search(){
              //console.log(this.$store.state.showSearchPage)
              this.$emit('search')
          }
      }
  }
</script>
