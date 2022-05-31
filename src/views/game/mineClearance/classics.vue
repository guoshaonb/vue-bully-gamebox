<template>
  <div class="mine-clearance">
    <div class="mine-clearance-option">
      <div>
        <span>选择难度：</span>
        <el-select
          v-model="difficulty"
          class="m-2"
          placeholder="Select"
          size="large"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="flag-count">{{ mineState.flagCount }}</div>
      <div class="cost-time">用时：{{ mineState.timeObj.duration }}</div>
    </div>
    <transition name="fade">
      <div class="mine-clearance-content">
        <ul v-if="mineState.isShow">
          <li
            v-for="item in mineState.boxList"
            :key="item.id"
            :id="item.id"
            :class="{ 'is-lei': item.isLei }"
            @mousedown="mouseDown($event, item.id)"
          ></li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import useMineClearance from "@/hooks/useMineClearance";
const optionProps = {
  options: [
    {
      value: 0,
      label: "简单",
      count_x: 10,
      count_y: 10,
      leiCount: 10,
      leiOdds: 0.1,
    },
    {
      value: 1,
      label: "一般",
      count_x: 12,
      count_y: 12,
      leiCount: 17,
      leiOdds: 0.12,
    },
    {
      value: 2,
      label: "困难",
      count_x: 15,
      count_y: 15,
      leiCount: 38,
      leiOdds: 0.15,
    },
  ],
  itemSize: "50px",
};
const {
  mouseDown,
  mineState,
  difficulty,
  options,
  itemSize,
  boxProps,
  boxList,
} = useMineClearance(optionProps);
</script>

<style lang="less" scoped>
.mine-clearance {
  height: 100%;
  &-option {
    display: flex;
    .flag-count {
      width: 50px;
      height: 50px;
      line-height: 50px;
      margin-left: 20px;
      position: relative;
      top: -5px;
      color: #fff;
      text-align: center;
      background: url("./images/hongqi.jpg") no-repeat center center;
      background-size: 100% 100%;
    }
    .cost-time {
      margin: 5px 0 0 20px;
    }
  }
  &-content {
    height: calc(100% - 40px);
    display: flex;
    justify-content: center;
    align-items: center;
    ul {
      width: v-bind("boxProps.width");
      height: v-bind("boxProps.height");
      display: flex;
      flex-wrap: wrap;
      li {
        width: v-bind(itemSize);
        height: v-bind(itemSize);
        background-color: grey;
        box-sizing: border-box;
        border: 1px solid #e2e2e2;
        text-align: center;
        line-height: v-bind(itemSize);
        color: #ccc;
        &.lei {
          background: url("./images/lei.jpg") no-repeat center center;
          background-size: 100% 100%;
        }
        &.flag {
          background: url("./images/hongqi.jpg") no-repeat center center;
          background-size: 100% 100%;
        }
        &.num {
          background: #ccc;
          color: #000;
        }
      }
    }
  }

  // 动画
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s ease;
  }
}
</style>