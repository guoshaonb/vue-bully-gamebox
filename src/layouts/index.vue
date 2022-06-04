<template>
  <div class="main-container">
    <div class="common-layout">
      <el-container class="main-container">
        <el-aside class="main-left"><Menu /></el-aside>
        <el-container class="main-right">
          <el-header><Header /></el-header>
          <el-main>
            <Content>
              <template #content>
                <router-view />
              </template>
            </Content>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Menu from "@/components/menu/menu.vue";
import Header from "./header/index.vue";
import Content from "./content/index.vue";
import Footer from "./footer/index.vue";
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  width: 100%;
  display: flex;
  .common-layout {
    width: 100%;
    .main-left {
      width: 200px;
      height: 100%;
    }
    .main-right {
      flex: 1;
      height: 100%;
      .el-header {
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid #e2e2e2;
      }
    }
  }
}
</style>