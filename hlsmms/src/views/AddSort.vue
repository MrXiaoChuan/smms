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
            <h3>添加分类</h3>
          </div>
          <div class="text item">
            <!-- 模板内容 -->
            <el-form
              :rules="rules"
              ref="form"
              label-position="top"
              :model="form"
              label-width="80px"
            >
              <el-form-item label="所属分类：">
                <el-select v-model="form.region" placeholder="---顶级分类---">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="分类名称：" prop="sortname">
                <el-input v-model="form.sortname"></el-input>
              </el-form-item>
              <el-form-item label="状态：">
                <el-radio v-model="radio" label="1">启用</el-radio>
                <el-radio v-model="radio" label="2">禁用</el-radio>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('form')">添加</el-button>
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
    return {
      radio: '1',
      form: {
        region: "",
        sortname: ""
      },
      rules: {
        sortname: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
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
</style>