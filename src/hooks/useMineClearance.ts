import { onBeforeUnmount, onMounted, reactive, watch, toRaw, type Ref, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import _ from "lodash";
import { hasClass, addClass, removeClass } from './../utlis/classTool'

// 类型检查
type stateType = {
  flagCount: number,
  isShow: boolean,
}

type optionType = {
  options: Array<{ value: number, label: string, count_x: number, count_y: number, leiCount: number, leiOdds: number }>,
  itemSize: string
}

export default function (optionProps: optionType) {
  // 初始化状态
  let mineState = reactive<stateType>({
    flagCount: 10,
    isShow: true
  })

  // 难度选项
  const difficulty = ref<number>(0);
  const options = optionProps.options;

  // 雷盘属性
  const itemSize = ref(optionProps.itemSize);
  const boxProps = computed(() => {
    reset()
    const count_x = options[difficulty.value].count_x;
    const count_y = options[difficulty.value].count_y;
    return {
      width: count_x * parseInt(itemSize.value) + "px",
      height: count_y * parseInt(itemSize.value) + "px",
    };
  });

  // 雷盘数据
  const boxList = computed(() => {
    let boxList = [];
    let isLeiCount = 0;
    const count_x = options[difficulty.value].count_x;
    const count_y = options[difficulty.value].count_y;
    const leiCount = options[difficulty.value].leiCount;
    const leiOdds = options[difficulty.value].leiOdds;
    do {
      boxList = [];
      isLeiCount = 0;
      for (let i = 0; i < count_x; i++) {
        for (let j = 0; j < count_y; j++) {
          const isLei = Math.random() > 1 - leiOdds;
          if (isLei) {
            isLeiCount++;
          }
          boxList.push({
            id: 's' + i + "-" + 's' + j,
            isLei,
          });
        }
      }
    } while (isLeiCount != leiCount);
    return boxList;
  });

  // 时钟延迟
  let timer: any = null;
  const delay = (times: number) => {
    return new Promise((resolve) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        resolve(1)
      }, times)
    })
  }

  // 雷盘重置
  const reset = async () => {
    Object.assign(mineState, {
      isShow: false,
      flagCount: options[difficulty.value].leiCount
    })
    await delay(500)
    mineState.isShow = true
  }

  // 游戏结束
  const gameOver = async () => {
    const leiAll = document.querySelectorAll(".is-lei")
    for (const item in leiAll) {
      addClass(leiAll[item].id, 'lei')
    }
    await delay(500)
    window.location.reload()
  }

  // 点击事件
  const clickEvent = async (id: string) => {
    await delay(100)
    if (hasClass(id, 'flag')) {
      return
    }
    // 判断是否踩雷了
    if (hasClass(id, 'is-lei')) {
      gameOver()
      return ElMessage.error('踩到雷了，游戏结束')
    }
    const elem: any = document.querySelector(`#${id}`)
    const count_x = options[difficulty.value].count_x;
    const count_y = options[difficulty.value].count_y;
    const indexX = parseInt(id?.split("-")?.[0]?.split("s")?.[1]);
    const indexY = parseInt(id?.split("-")?.[1]?.split("s")?.[1]);

    let leiCount = 0
    for (let i = indexX - 1; i <= indexX + 1; i++) {
      for (let j = indexY - 1; j <= indexY + 1; j++) {
        if (!(i < 0 || j < 0 || i > count_x - 1 || j > count_y - 1)) {
          const isLei = document.querySelector("#" + 's' + i + "-" + 's' + j + ".is-lei");
          isLei && leiCount++
        }
      }
    }
    addClass(id, 'num')
    if(elem) {
      elem.innerHTML = leiCount
    }
    // 周围一圈找雷
    if (leiCount == 0) {
      for (let i = indexX - 1; i <= indexX + 1; i++) {
        for (let j = indexY - 1; j <= indexY + 1; j++) {
          const elem: any = document.querySelector(`#${'s' + i + "-" + 's' + j}`)
          elem && clickEvent(elem.id)
        }
      }
    }
  }

  // 插旗事件
  const flagEvent = function (id: string) {
    if (!hasClass(id, 'flag')) {
      if (mineState.flagCount == 0) {
        return ElMessage.warning('旗子用完了')
      }
      addClass(id, 'flag')
      mineState.flagCount--
    } else {
      removeClass(id, 'flag')
      mineState.flagCount++
    }
    const leiCount = options[difficulty.value].leiCount
    const leiFlagLen = document.querySelectorAll(".is-lei.flag").length
    if (leiCount == leiFlagLen) {
      gameOver()
      return ElMessage.success('恭喜你，游戏成功')
    }
  }

  // 雷盘操作
  const mouseDown = _.throttle(function (e: any, id: string) {
    if(!mineState.isShow) {
      return false
    }
    e.preventDefault()
    if (e.which === 1) {
      clickEvent(id)
    } else if (e.which === 3) {
      flagEvent(id)
    }
  },500)

  onMounted(() => {
    // 初始化设置
    document.oncontextmenu = function () {
      return false
    }
  })

  return {
    mouseDown, mineState, difficulty, options, itemSize, boxProps, boxList
  }
}