<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <!-- 左側 -->
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>會員管理</template>
          <el-menu-item-group>
            <el-menu-item index="1-1">
                <router-link to="{name:'MemberLevel',params:{id:2}}">會員等級</router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
                 <router-link to="/member/list">會員列表</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>商品管理</template>
          <el-menu-item-group>
            <el-menu-item index="2-1">商品分類</el-menu-item>
            <el-menu-item index="2-2">商品列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 頭部 -->
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      <!-- Body -->
      <el-main>
         <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Main",
};
</script>

<style scoped>
el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>