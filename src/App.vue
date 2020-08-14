<template>
    <div id="app">
        <el-container>
            <el-aside>
                <LayoutAside></LayoutAside>
            </el-aside>
            <el-container>
                <el-header>
                    <LayoutHeader></LayoutHeader>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer>
                    2020 - 2030 MyFramework.com copyright.
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import LayoutAside from "@/components/layout/LayoutAside";
import LayoutHeader from "@/components/layout/LayoutHeader";

export default {
    name: 'app',
    components: {LayoutHeader, LayoutAside},
}
</script>

<style>
body {
    margin: 0;
}
</style>
