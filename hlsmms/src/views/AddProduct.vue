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
              <el-form-item label="所属分类：" prop="classname">
                <el-select v-model="ruleForm.classname" placeholder="-----选择分类-----">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品条形码：" prop="barcode">
                <el-input v-model="ruleForm.barcode" style="width:500px;"></el-input>
                <el-button type="primary" @click="onSubmit" style="margin-left:4px;">生成条形码</el-button>
              </el-form-item>
              <el-form-item label="商品名称：" prop="goodsname">
                <el-input v-model="ruleForm.goodsname" style="width:500px;"></el-input>
              </el-form-item>
              <el-form-item label="商品进价：" prop="costprice">
                <el-input @blur="costprice" v-model="ruleForm.costprice" style="width:200px;"></el-input>&nbsp;元
              </el-form-item>
              <el-form-item label="商品售价：">
                <el-input v-model="ruleForm.saleprice" style="width:200px;"></el-input>&nbsp;元
              </el-form-item>
              <el-form-item label="市场价：">
                <el-input v-model="ruleForm.marketprice" style="width:200px;"></el-input>&nbsp;元
                <p class="ps">默认市场价为售价的1.2倍</p>
              </el-form-item>
              <el-form-item label="入库数量：">
                <el-input v-model="ruleForm.stocknum" style="width:200px;"></el-input>
                <p class="ps">记重商品单位为千克</p>
              </el-form-item>
              <el-form-item label="商品重量：">
                <el-input v-model="ruleForm.weight" style="width:200px;"></el-input>
              </el-form-item>
              <el-form-item label="商品单位：">
                <el-input v-model="ruleForm.unit" style="width:200px;"></el-input>
              </el-form-item>
              <el-form-item label="会员优惠：">
                <el-radio-group v-model="ruleForm.isdiscount">
                  <el-radio label="1">享受</el-radio>
                  <el-radio label="0">不享受</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否促销： ">
                <el-radio-group v-model="ruleForm.ispromotion">
                  <el-radio label="1">启用</el-radio>
                  <el-radio label="0">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="活动形式">
                <el-input type="textarea" v-model="ruleForm.details"></el-input>
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
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      radio: "1",
      radio1: "2",
      ruleForm: {
        classname: "",
        barcode: "",
        goodsname: "",
        saleprice: 0,
        marketprice: 0,
        costprice: 0,
        stocknum: 0,
        weight: "",
        unit: "",
        details: "",
        isdiscount: "1",
        ispromotion: "1"
      },
      rules: {
        classname: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        barcode: [
          { required: true, message: "请输入商品条形码", trigger: "change" }
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        costprice: [
          { required: true, message: "请输入商品价格", trigger: "blur" }
        ]
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
          this.axios
            .post(
              "http://172.16.4.199:9090/goods/add",
              this.qs.stringify(this.ruleForm)
            )
            .then(result => {
              if (result.data.isOk) {
                this.$message({
                  message: "恭喜你" + result.data.msg,
                  type: "success"
                });
                this.$confirm(" 是否继续添加商品?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                  .then(() => {
                    this.ruleForm = {
                      classname: "",
                      barcode: "",
                      goodsname: "",
                      saleprice: 0,
                      marketprice: 0,
                      costprice: 0,
                      stocknum: 0,
                      weight: "",
                      unit: "",
                      details: "",
                      isdiscount: "1",
                      ispromotion: "1"
                    };
                  })
                  .catch(() => {
                    this.$router.push("/goodscontrol");
                  });
              } else {
                this.$message.error("错了：" + result.data.msg);
              }
            })
            .catch(err => {
              console.error(err.message);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onSubmit() {
      this.ruleForm.barcode = new Date().getTime();
    },
    costprice() {
      this.ruleForm.saleprice = this.ruleForm.costprice * 5;
      this.ruleForm.marketprice = this.ruleForm.saleprice * 1.2;
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