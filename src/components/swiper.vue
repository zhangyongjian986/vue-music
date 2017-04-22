<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in sliders">
        <img :src="item.picUrl" class="slide-item">
      </div>

    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>
<style>

</style>
<script>
  import swiper from '../assets/lib/swiper/swiper'
  export default {
      props:{
          sliders:{
              type:Array
          }
      },
      data(){
          return {

          }
      },
      mounted(){
          var mySwiper = new Swiper('.swiper-container',{
            direction:'horizontal',
            loop:true,
            pagination:'.swiper-pagination',
            autoplay:2000
          })
      }
  }
</script>
<style>
  @import '../assets/lib/swiper/swiper.min.css';
  .swiper-container{
    width:100%;
  }
  .swiper-pagination-bullet-active {
    background: #fff;
  }
  .slide-item{
    width:100%;
  }
</style>
