<template>
  <div class="header-item" :class="{'active-item':isActive}" v-text="title" @click="tab">
  </div>
</template>
<style>
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
          id:{
              type:String
          },
        title:{
              type:String
        }
      },
    methods:{
          tab(e){
            var index=this.id;
            this.$parent.$router.push(index)
            this.$parent.$emit('input',index)
          }
    },
    computed:{
          isActive(){
              //console.log(this.id)
              return this.$parent.value===this.id;
          }
    }
  }
</script>

