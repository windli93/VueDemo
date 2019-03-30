<template>
  <li class="color_1" @click="deleteItem">{{item}}</li>
</template>

<script>
export default {
  props: ["item","index"],
  methods: {
      deleteItem(){
         this.$emit('delete-on', this.index);
      }
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .color_1{
     color: green;
   }
</style>
