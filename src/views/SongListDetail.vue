<template>
  <div class="list-detail">
    <div class="list-detail">

    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data(){
      return{
        listId:''
      }
    },
    mounted() {
      this.getListId();
    },
    methods:{
      getListId(){
        this.listId=this.$route.query.id
      }
    }
  }
</script>

<style scoped>

</style>
