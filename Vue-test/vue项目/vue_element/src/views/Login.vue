<template>
  <el-form ref="form" :model="form" :rules="rules" class="login-box">
    <h3 class="login-text">欢迎登录</h3>
    <el-form-item label="账号" prop="name">
      <el-input
        type="Text"
        placeHolder="请输入用户名"
        v-model="form.name"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        placeHolder="请输入密码"
        v-model="form.password"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
      rules: {
        name: [
          {required: true, message: "请输入名称", trigger: "blur"},
          {min: 3, max: 5, message: "长度在 3 到 10 个字符", trigger: "blur"},
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "change"},
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$router.push({
            name: 'main',
            params: {name: this.form.name, password: this.form.password},
          });
        } else {
          this.$message({
            message: "請輸入用戶名或者密碼",
            type: "warning",
          });
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-box {
  width: 350px;
  margin: 150px auto;
  border: 1px solid back;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 30px #dcdfe6;
}

.login-text {
  text-align: center;
}
</style>
