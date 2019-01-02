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
            <h3>账号管理</h3>
          </div>
          <div class="text item">
            <!-- 模板内容 -->
            <el-table :data="tableData" style="width: 100%">
              <!-- 日期 -->
              <el-table-column label="日期" width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.date | foramtData}}</span>
                </template>
              </el-table-column>
              <!-- 用户名称 -->
              <el-table-column label="用户名称" width="180">
                <template slot-scope="scope">
                  <i class="el-icon-username"></i>
                  <span style="margin-left: 10px">{{ scope.row.username }}</span>
                </template>
              </el-table-column>
              <!-- 用户组 -->
              <el-table-column label="用户组" width="180">
                <template slot-scope="scope">{{ scope.row.usergroup }}</template>
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.row)">
                    <i class="el-icon-edit"></i>编辑
                  </el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.row.userid)">
                    <i class="el-icon-delete"></i>删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-main>
      <!-- 右边footer -->
      <RightFooter></RightFooter>
      
    </el-container>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form
              :model="ruleForm"
              status-icon
              :rules="rules2"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
      <el-form-item label="账号" prop="username">
        <el-input type="text" style="width:70%;" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="usergroup">
        <el-select v-model="ruleForm.usergroup" placeholder="选择用户组">
          <el-option label="普通用户" value="普通用户"></el-option>
          <el-option label="超级用户" value="超级用户"></el-option>
        </el-select>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
  
</template>

<script>
import LeftMenu from "../components/leftMenu";
import RightHeader from "../components/rightHeader";
import RightFooter from "../components/rightFooter";
import moment from "moment";

export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      ruleForm: {
        username: "",
        usergroup: "",
        userid:'',
      },
      rules2: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { max: 10, message: "长度在 10 以内的字符", trigger: "blur" }
        ],
        usergroup: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios.post("http://localhost:9090/users/usersave",this.qs.stringify(this.ruleForm))
          .then(result=>{
            if(result.data.isOk){
              this.$message({
              message:result.data.msg,
              type:'success',
            });
            // 关闭对话框
            this.dialogVisible= false;
            this.getusers();
            }else{
            this.$message.error(result.data.msg);
            }
          }).catch(err=>{
            this.$message.error("错误了："+err.message);
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    getusers() {
      this.axios
        .get("http://localhost:9090/users/getusers")
        .then(result => {
          this.tableData = result.data;
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    handleEdit(user){
      this.dialogVisible = true;
      this.ruleForm = user;
    },
    handleDelete(userid) {
      console.log(userid);
      this.axios
        .get("http://localhost:9090/users/deluser?userid=" + userid)
        .then(result => {
          console.log(result);
          result = result.data;
          if (result.isOk) {
            this.$message({
              message: "恭喜你，删除成功",
            });
            this.getusers();
          } else {
            this.$message.error("出错问题：" + err.message);
          }
        })
        .catch(err => {
          this.$message.error("出错问题：" + err.message);
        });
    },
    
  },
  components: {
    LeftMenu,
    RightHeader,
    RightFooter
  },
  created() {
    this.getusers();
  },
  filters: {
    foramtData(oldData) {
      return moment(oldData).format("YYYY-MM-DD");
    }
  }
};
</script>

<style>
</style>