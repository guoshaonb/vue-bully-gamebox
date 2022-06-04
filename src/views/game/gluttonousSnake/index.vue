<template>
  <div class="gluttonous-snake">
    <div class="gluttonous-snake-content">
      <ul>
        <li
          v-for="item in list"
          :key="item.id"
          :style="{ left: item.left + 'px', top: item.top + 'px' }"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const list = ref([
  {
    id: 1,
    left: 700,
    top: 50,
  },
  {
    id: 2,
    left: 712,
    top: 50,
  },
  {
    id: 3,
    left: 724,
    top: 50,
  },
]);

// 定义方向
const direction = {
  left: {
    left: -1,
    top: 0,
  },
  right: {
    left: 1,
    top: 0,
  },
  up: {
    left: 0,
    top: -1,
  },
  down: {
    left: 0,
    top: 1,
  },
};

const selectValue = ref('left');

// 每过一秒种左移
setInterval(() => {
  switch (selectValue.value) {
    case 'left':
      list.value.forEach((item) => {
        item.left += -12;
      });
      break;
    case 'right':
      list.value.forEach((item) => {
        item.left += 12;
      });
      break;
    case 'up':
      list.value.forEach((item) => {
        item.top += -12;
      });
      break;
    case 'down':
      list.value.forEach((item) => {
        item.top += 12;
      });
      break;
  }
}, 200);

document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (key === 'ArrowLeft') {
    selectValue.value = 'left';
  }
  if (key === 'ArrowRight') {
    selectValue.value = 'right';
  }
  if (key === 'ArrowUp') {
    selectValue.value = 'up';
  }
  if (key === 'ArrowDown') {
    selectValue.value = 'down';
  }
});
</script>

<style lang="less" scoped>
.gluttonous-snake {
  height: 100%;
  &-content {
    height: 100%;
    width: 100%;
    background-color: #000;
    & ul {
      height: 100%;
      width: 100%;
      position: relative;
      & li {
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: #fff;
        margin: 0 1px;
      }
    }
  }
}
</style>