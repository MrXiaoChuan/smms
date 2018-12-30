<template>
  <el-container id="home">
    <!-- 左边菜单栏 -->
    <LeftMenu></LeftMenu>
    <el-container id="mainContent">
      <!-- 右边header -->
      <RightHeader></RightHeader>
      <!-- 右边content -->
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h3>修改账号密码</h3>
          </div>
          <div class="text item">
            <!-- 模板内容 -->
            <el-form
              :model="ruleForm2"
              status-icon
              :rules="rules2"
              ref="ruleForm2"
              label-width="100px"
              class="demo-ruleForm"
              label-position="top"
            >
              <el-form-item label="原密码" prop="OldPassword">
                <el-input type="password" v-model="ruleForm2.OldPassword"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="Newpassword">
                <el-input type="password" v-model="ruleForm2.Newpassword" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="Newpassword2">
                <el-input type="password" v-model="ruleForm2.Newpassword2" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">修改</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-main>
      <!-- 右边footer -->
      <RightFooter></RightFooter>
    </el-container>
  </el-container>
</template>

<script>
import LeftMenu from "../components/leftMenu";
import RightHeader from "../components/rightHeader";
import RightFooter from "../components/rightFooter";

export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.Newpassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        OldPassword: "",
        Newpassword: "",
        Newpassword2: ""
      },
      rules2: {
        OldPassword: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          { min: 8, max: 20, message: "长度在 8 到 20 个字符", trigger: "blur" }
        ],
        Newpassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 8, max: 20, message: "长度在 8 到 20 个字符", trigger: "blur" }
        ],
        Newpassword2: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 8, max: 20, message: "长度在 8 到 20 个字符", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  components: {
    LeftMenu,
    RightHeader,
    RightFooter
  }
};
</script>

<style>
.el-input{
  width:40%;
}
</style>