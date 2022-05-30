<template>
  <!-- 通过isCollapse控制显示隐藏 -->
  <div class="left-box">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <template v-for="item in menuData">
        <el-sub-menu
          v-if="item && item.children && item.children.length > 0"
          :key="item.key"
          :index="item?.path"
        >
          <template #title>
            <el-icon><component :is="item?.icon"></component></el-icon
            ><span>{{ item.title }}</span>
          </template>
          <MenuItem
            :menuList="item?.children"
          />
        </el-sub-menu>
        <el-menu-item v-else :key="item.key" :index="item?.path">
          <template #title>
            <el-icon><component :is="item?.icon"></component></el-icon
            ><span>{{ item.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { menuData } from "./data";
import MenuItem from "./menu-item.vue";

const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.left-box {
  height: 100%;
  ul {
    height: 100%;
    a {
      color: #333;
    }
    .is-active a {
      color: var(--el-menu-active-color);
    }
  }
}
</style>
