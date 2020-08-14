<template>
    <div class="layout-header">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    name: 'LayoutHeader',
    computed: {
        menus: function () {
            const tree = this.$store.state.menus;
            return tree;
        }
    }
}
</script>

<style lang="less">
.layout-header {
  display: flex;
  //justify-content: center;
  align-items: center;
  height: 50px;
  //background: #;
}
</style>