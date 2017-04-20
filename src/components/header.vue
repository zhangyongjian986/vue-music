<template>
  <div class="header" >
    <slot></slot>
  </div>
</template>
<style lang="less">
  @import url('../style/mixin');
  .header{
  .flex-display(row);
    justify-content: center;
    .fix-position(0,0,0);
    z-index: 2;
    background: rgb(224,67,54);
    height: 3.75rem;
    line-height:3.75rem;
    font-size:1.5rem;
  }
  .header-item{
    align-items:center;
    flex: 1;
  }
  .active-item{
  background:rgb(244,67,54);
  }
</style>
<script>
  export default {
      data(){
          return {

          }
        },
      props:{
          value:{
              type:String
          }
      },
      methods:{

          },
      computed:{

      }
}
</script>
