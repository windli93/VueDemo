<template>
<div>
   <input v-model="inputValue"/>
   <button @click="hadleSubmit">提交按钮</button>
   <div>
   <ul>
      <todo-item v-for="(item, index) in list" :key="index" :item="item" :index="index" @delete-on="hadleDelete"></todo-item>
   </ul>
   </div>
</div>
</template>

<script>
   import todoItem from "./components/item.vue";
   export default{
     components: {
          "todo-item": todoItem,
     },
     data(){
       return{
         inputValue: "",
         list: [],
       }
     },
     methods: {
        hadleSubmit(){
            this.list.push(this.inputValue);
            this.inputValue = "";
        },
        hadleDelete(index){
            this.list.splice(index,1);
        }
     },
   }
</script>

<style>

</style>
