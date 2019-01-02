<template>
  <div id="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2 style="margin:0px;">登陆页面</h2>
      </div>
      <div class="text item">
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="username">
            <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userpwd">
            <el-input type="password" v-model="ruleForm2.userpwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm2: {
        userpwd: "",
        username: ""
      },
      rules2: {
        userpwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 允许axios携带cookie证书
          this.axios.defaults.withCredentials=true;
          // 
          this.axios.post('http://localhost:9090/users/checklogin',this.qs.stringify(this.ruleForm2))
          .then(result=>{
            console.log("验证的结果"+result);
            if(result.data.isOk){
              this.$message({
                message:'恭喜你，'+result.data.msg,
                type:'success',
              });
              this.$router.push('/');
            }else{
              this.$message.error(result.data.msg);
            }
          }).catch(err=>{
            this.$message.error("错了"+err.message);
          });
        } else {
          console.log("登陆失败");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-card{
  background-color:rgba(255,255,255,0.6) !important;
}
.box-card {
  position: fixed;
  left: 50%;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 480px;
  height: 300px;
}
#login {
  background: url('../assets/images/login3.jpg') no-repeat;
  background-size: 100% 100%;
}
.el-input__inner{
  background-color:rgba(255,255,255,0.2) !important;
}
.el-input{
  width:80%;
}
</style>
