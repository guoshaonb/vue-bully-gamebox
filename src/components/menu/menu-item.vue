<template>
  <div>
    <el-menu-item-group>
      <el-menu-item
        v-for="item in menuList"
        :key="item?.key"
        :index="item?.path"
      >
        <el-icon><component :is="item?.icon"></component></el-icon><span>{{ item.title }}</span>
        <el-sub-menu
          v-if="item && item.children && item.children.length > 0"
          :key="item?.key"
          :index="item?.path"
        >
          <MenuItem
            :menuList="item?.children"
          />
        </el-sub-menu>
      </el-menu-item>
    </el-menu-item-group>
  </div>
</template>

<script setup lang="ts">
import MenuItem from "./menu-item.vue";
const props = defineProps(["menuList"]);
const menuList = props.menuList;
</script>

<style lang="less" scoped>
::v-deep {
  .el-menu-item-group__title {
    display: none !important;
  }
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