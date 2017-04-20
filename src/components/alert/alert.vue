<template>
  <div :id="'alert-'+option.id" class="alert" :style="{width:option.width + 'px',height:option.height + 'px'}">
    <header class="alert-top">
      {{option.title}}
    </header>
    <section class="alert-middle">
      <div class="alert-content">{{option.context}}</div>
    </section>

    <div class="alert-bottom">
    </div>
  </div>
</template>
<style lang="less" scoped>
  @import url('../../style/mixin');
  .alert{
    .all-center(fixed);
    background: #fff;
    top:50%;
    z-index: 999;
    .flex-display(column);
    border-radius:5px;
    &:after{
      .text-center();
    }
    .alert-top{
      flex: .8;
      font-size: 20px;
    }
    .alert-middle{
      flex: 2;
      padding: 5px 15px;
    }
    .alert-bottom{
      flex: .5;
    }
  }
</style>
<script>
  export default{
      props:{
         option:{
           type:Object,
           default:{
             id:'alert1',
             width:280,
             height:210,
             title:'这里是警告框标题',
             context:'这里是警告框内容',
             delayed:3000
           }
         }
      },
      methods:{
          closeAlert(){
              let self = this
              setTimeout(function () {
                document.getElementById('alert-'+self.option.id).style.display = 'none'
              },self.option.delayed)
          }
      },
    mounted(){
          this.closeAlert()
    }
  }
</script>
