<template>
    <el-aside width="230px">
      <div id="leftTitle">
        <h2>华联超市管理系统</h2>
        <p>您好,admin</p>
        <p>
          <a href="#">管理首页</a>|
          <a href="#" @click="loginout()">退出系统</a>
        </p>
      </div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :unique-opened="true"
      >
        <el-submenu index="1">
          <template slot="title">
            <span>分类管理</span>
          </template>
          <el-menu-item index="/sortmanagement"><router-link to="/sortmanagement">分类管理</router-link></el-menu-item>
          <el-menu-item index="/addsort"><router-link to="/addsort">添加分类</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <span>商品管理</span>
          </template>
          <el-menu-item index="/goodscontrol"><router-link to="goodscontrol">商品管理</router-link></el-menu-item>
          <el-menu-item index="/addproduct"><router-link to="addproduct">添加商品</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span>进货管理</span>
          </template>
          <el-menu-item index="/stockcontrol"><router-link to="/stockcontrol">库存管理</router-link></el-menu-item>
          <el-menu-item index="/addstock"><router-link to="/addstock">添加库存</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <span>出货管理</span>
          </template>
          <el-menu-item index="4-1">销售列表</el-menu-item>
          <el-menu-item index="4-2">商品出库</el-menu-item>
          <el-menu-item index="4-3">商品退货</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <span>系统管理</span>
          </template>
          <el-menu-item index="5-1">销售统计</el-menu-item>
          <el-menu-item index="5-2">进货统计</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <span>账号管理</span>
          </template>
          <el-menu-item index="/userlist"><router-link to="/userlist">账号管理</router-link></el-menu-item>
          <el-menu-item index="/useradd"><router-link to="/useradd">添加账号</router-link></el-menu-item>
          <el-menu-item index="/userpwdedit"><router-link to="/userpwdedit">密码修改</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">
            <span>会员管理</span>
          </template>
          <el-menu-item index="7-1">账号管理</el-menu-item>
          <el-menu-item index="7-2">添加账号</el-menu-item>
        </el-submenu>
        <el-submenu index="8">
          <template slot="title">
            <span>系统管理</span>
          </template>
          <el-menu-item index="8-1">系统信息</el-menu-item>
          <el-menu-item index="8-2">系统配置</el-menu-item>
          <el-menu-item index="8-3">权限管理</el-menu-item>
          <el-menu-item index="8-4">添加管理组</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

</template>

<script>
export default {
    methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    loginout(){
      this.axios.get("http://172.16.4.199:9090/users/loginout")
      .then(result=>{
        if(result.data.isOk){
          this.$message({
            message:"退出成功！欢迎下次登陆!",
            type:'success',
          });
          this.$router.push('/login');
        }else{
          this.$message.error("退出失败");
        }
      }).catch(err=>{
        console.log(err);
      })
    }
  }
    
}
</script>

<style>

</style>

