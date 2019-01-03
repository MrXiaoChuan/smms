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
            <h3>商品管理</h3>
          </div>
          <div class="text item">
            <!-- 模板内容 -->
            <el-select v-model="value" placeholder="----选择分类----">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>关键字：
            <el-input v-model="input" placeholder="请输入内容" style="width:30%" clearable></el-input>（商品名称，条形码）
            <el-button type="success">查询</el-button>

            <!-- 表单 -->
            <el-table :data="tableData" style="width: 100%">
              <el-table-column fixed prop="upc" label="商品条形码" width="150"></el-table-column>
              <el-table-column prop="tradename" label="商品名称" min-width="100"></el-table-column>
              <el-table-column prop="Classification" label="所属分类" min-width="100"></el-table-column>
              <el-table-column prop="price" label="售价(元)" min-width="100"></el-table-column>
              <el-table-column prop="saleprice" label="促销价(元)" min-width="100"></el-table-column>
              <el-table-column prop="marketprice" label="市场价(元)" min-width="100"></el-table-column>
              <el-table-column prop="stock" label="库存" min-width="100"></el-table-column>
              <el-table-column prop="totalinventory" label="库存总额(元)" min-width="100"></el-table-column>
              <el-table-column prop="totalsales" label="销售总额(元)" min-width="100"></el-table-column>
              <el-table-column fixed="right" label="管理" width="145">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.index,scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination 
            style="margin:40px 0 20px"
            background 
            layout="prev, pager, next" 
            :total="1000">
            </el-pagination>
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
      input: "",
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
      value: "",
      tableData: [
        {
          upc: "6911989262549",
          tradename: "优乐美",
          Classification: "奶茶",
          price: "2.00",
          saleprice: "未促销",
          marketprice: "2.40",
          stock: "0(缺货)",
          totalinventory: "0.00",
          totalsales: "0.00"
        },
        {
          upc: "6911989262549",
          tradename: "优乐美",
          Classification: "奶茶",
          price: "2.00",
          saleprice: "未促销",
          marketprice: "2.40",
          stock: "0(缺货)",
          totalinventory: "0.00",
          totalsales: "0.00"
        },
        {
          upc: "6911989262549",
          tradename: "优乐美",
          Classification: "奶茶",
          price: "2.00",
          saleprice: "未促销",
          marketprice: "2.40",
          stock: "0(缺货)",
          totalinventory: "0.00",
          totalsales: "0.00"
        },
        {
          upc: "6911989262549",
          tradename: "优乐美",
          Classification: "奶茶",
          price: "2.00",
          saleprice: "未促销",
          marketprice: "2.40",
          stock: "0(缺货)",
          totalinventory: "0.00",
          totalsales: "0.00"
        }
      ]
    };
  },
  components: {
    LeftMenu,
    RightHeader,
    RightFooter
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style>
.el-table{
  margin-top:20px;
  border-top:4px solid #ccc;
}
</style>