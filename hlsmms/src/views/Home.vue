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
            <h3>系统信息</h3>
          </div>
          <div class="content">
            <el-alert title="成功提示的文案" type="success"></el-alert>
            <el-alert title="消息提示的文案" type="info"></el-alert>
          </div>
          <el-row :gutter="40">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <h3>销售排行</h3>
                  </div>
                  <div>
                    <el-table :data="tableData" style="width: 100%">
                      <el-table-column prop="tradeName" label="商品名称"></el-table-column>
                      <el-table-column prop="salesVolume" label="销量"></el-table-column>
                    </el-table>
                  </div>
                </el-card>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <h3>缺货的商品</h3>
                  </div>
                  <div>
                    <el-table :data="shortage" style="width: 100%">
                      <el-table-column prop="tradeName" label="商品名称"></el-table-column>
                      <el-table-column prop="Stock" label="库存"></el-table-column>
                      <el-table-column prop="operation" label="操作"></el-table-column>
                    </el-table>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-main>
      <!-- 右边footer -->
      <RightFooter></RightFooter>
    </el-container>
  </el-container>
</template>

<script>

import LeftMenu from '../components/leftMenu';
import RightHeader from '../components/rightHeader';
import RightFooter from '../components/rightFooter';

export default {
  data() {
    return {
      tableData: [
        {
          tradeName: "商品一",
          salesVolume: "20"
        },
        {
          tradeName: "商品二",
          salesVolume: "30"
        },
        {
          tradeName: "商品三",
          salesVolume: "40"
        },
        {
          tradeName: "商品四",
          salesVolume: "50"
        }
      ],
      shortage:[
        {
          tradeName: "商品一",
          Stock: "0",
          operation:'入库'
        },
        {
          tradeName: "商品二",
          Stock: "0",
          operation:'入库'
        },
        {
          tradeName: "商品三",
          Stock: "0",
          operation:'入库'
        },
        {
          tradeName: "商品四",
          Stock: "0",
          operation:'入库'
        }
      ]
    };
  },
  components: {
    LeftMenu,
    RightHeader,
    RightFooter,
  },
  
};
</script>

<style>

</style>