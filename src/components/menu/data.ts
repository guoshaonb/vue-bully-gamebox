// 引入图标
import {
  ZoomIn,
  ZoomOut,
  Paperclip,
  Position,
  MoonNight,
  Grid, 
  PieChart
} from "@element-plus/icons-vue";
export const menuData = [
  {
    title: "扫雷",
    key: "1",
    icon: ZoomIn,
    path: '/game/mineClearance',
    children: [
      {
        title: "经典扫雷",
        key: "1-1",
        icon: ZoomOut,
        path: '/game/mineClassics',
      },
      {
        title: "炼狱扫雷",
        key: "1-2",
        icon: ZoomOut,
        path: '/game/minePurgatory',
      },
    ],
  },
  {
    title: "贪吃蛇",
    key: "2",
    icon: Paperclip,
    path: '/game/gluttonousSnake',
  },
  {
    title: "飞机大战",
    key: "3",
    icon: Position,
    path: '/game/battleClassics',
    children: [
      {
        title: "经典飞机大战",
        key: "3-1",
        icon: MoonNight,
        path: '/game/battleClassics',
      },
      {
        title: "炼狱飞机大战",
        key: "3-2",
        icon: MoonNight,
        path: '/game/battlePurgatory',
      },
    ],
  },
  {
    title: "俄罗斯方块",
    key: "4",
    icon: Grid,
    path: '/game/tetris',
  },
  {
    title: "五子棋",
    key: "5",
    icon: PieChart,
    path: '/game/five-in-a-row',
  },
];