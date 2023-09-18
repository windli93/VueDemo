<template>
  <div>會員等級: {{ id }}</div>
</template>

<script>
export default {
  props: ['id'],
  name: 'MemberLevel',
  beforeRouteEnter: (to, form, next) => {
    console.log("进入会员等级页面");
    next(vm => {
         vm.getData();
    });
  },
  beforeRouteLeave: (to, form, next) => {
    console.log("离开会员等级页面");
    next();
  },
  methods: {
    getData: function () {
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/data.json',
      }).then(function (resp) {
        console.log(resp);
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>

</style>
