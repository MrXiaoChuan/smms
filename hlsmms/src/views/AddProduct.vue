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
            <h3>添加商品</h3>
          </div>
          <div class="text item">
            <!-- 模板内容 -->
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
              label-position="top"
            >
              <el-form-item label="所属分类：" prop="region">
                <el-select v-model="ruleForm.region" placeholder="-----选择分类-----">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品条形码：" prop="upc">
                <el-input v-model="ruleForm.upc" style="width:500px;"></el-input>
                <el-button type="primary" @click="onSubmit" style="margin-left:4px;">生成条形码</el-button>
              </el-form-item>
              <el-form-item label="商品名称：" prop="tradename">
                <el-input v-model="ruleForm.tradename" style="width:500px;"></el-input>
              </el-form-item>
              <el-form-item label="商品进价：">
                <el-input @blur="pcsaleprice" v-model="ruleForm.pcsaleprice" style="width:200px;"></el-input>&nbsp;元
              </el-form-item>
              <el-form-item label="商品售价：" prop="price">
                <el-input v-model="ruleForm.price" style="width:200px;"></el-input>&nbsp;元
              </el-form-item>
              <el-form-item label="市场价：">
                <el-input v-model="ruleForm.marketvalue" style="width:200px;"></el-input>&nbsp;元
                <p class="ps">默认市场价为售价的1.2倍</p>
              </el-form-item>
              <el-form-item label="入库数量：">
                <el-input v-model="ruleForm.stockpurchase" style="width:200px;"></el-input>
                <p class="ps">记重商品单位为千克</p>
              </el-form-item>
              <el-form-item label="商品重量：">
                <el-input v-model="ruleForm.weight" style="width:200px;"></el-input>
              </el-form-item>
              <el-form-item label="商品单位：">
                <el-input v-model="ruleForm.company" style="width:200px;"></el-input>
              </el-form-item>
              <el-form-item label="会员优惠：">
                <el-radio v-model="radio" label="1">享受</el-radio>
                <el-radio v-model="radio" label="2">不享受</el-radio>
              </el-form-item>
              <el-form-item label="是否促销： ">
                <el-radio v-model="radio1" label="1">启用</el-radio>
                <el-radio v-model="radio1" label="2">禁用</el-radio>
              </el-form-item>
              <el-form-item label="商品介绍：" style="width:800px;">
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
                <p class="ps">不超过200个汉字</p>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
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
      radio: "1",
      radio1: "2",
      ruleForm: {
        region: "",
        upc: "",
        tradename: "",
        price: "",
        marketvalue: "",
        pcsaleprice: "",
        stockpurchase: "",
        weight: "",
        company: "",
        textarea: ""
      },
      rules: {
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        upc: [
          { required: true, message: "请输入商品条形码", trigger: "change" }
        ],
        tradename: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }]
      }
    };
  },
  components: {
    LeftMenu,
    RightHeader,
    RightFooter
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
    },
    onSubmit(){
      this.ruleForm.upc = new Date().getTime();
    },
    pcsaleprice(){
      this.ruleForm.price = this.ruleForm.pcsaleprice*5;
      this.ruleForm.marketvalue = this.ruleForm.price*1.2; 
    }
  }
};
</script>

<style>
.ps {
  margin: 0px;
  font-size: 12px;
  color: #7c7c7c;
  font-weight: lighter;
}
.el-form-item {
  font-weight: bold;
}
</style>