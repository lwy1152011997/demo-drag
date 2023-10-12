<template>
  <div class="wrapper">
    <div class="btn" @click="showPopup">点击弹出</div>
    <van-popup v-model:show="show" :style="{ padding: '64px' }">
      <div>
        <button @click="add">+</button>
        <span>{{ scaleRatio }}</span>
        <button @click="jian">-</button>
      </div>
      <div class="container">
        <VueDragResizeRotate
          :x="position.x"
          :y="position.y"
          :w="position.w"
          :h="position.h"
          :resizable="resizable"
          :parent="true"
        >
          <div :style="containerStyle()">
            <img :src="url" alt="" :style="imgStyle" />
          </div>
        </VueDragResizeRotate>
      </div>
    </van-popup>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { ref } from "vue";

defineProps<{ msg: string }>();

const show = ref(false);
const url =
  "https://img2.baidu.com/it/u=3930950673,3110442802&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=504";
const showPopup = () => {
  console.log("@@@@");

  show.value = true;
};
const width = 200;
const height = 200;
const resizable = ref(false);
const imgStyle = reactive({
  width: `${width}px`,
  height: `${height}px`,
});

// 缩放
const scaleRatio = ref(1);
const position = reactive({
  x: 0,
  y: 0,
  w: 200,
  h: 200,
});

const resizing = (x, y, w, h) => {
  position.x = x;
  position.y = y;
  position.h = w;
  position.x = h;
};

const containerStyle = () => {
  return {
    transform: `scale(${scaleRatio.value})`,
  };
};

const add = () => {
  scaleRatio.value += 0.1;
};

const jian = () => {
  scaleRatio.value -= 0.1;
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
  background-color: rgba($color: #857979, $alpha: 0.6);
  .btn {
    width: 100px;
    height: 50px;
    text-align: center;
    line-height: 50px;
  }

  .van-popup {
    width: 100%;
    height: 100%;
    padding: 0 !important;
    .container {
      width: 100%;
      height: 100%;
      transform-origin: center center;
    }
  }
}
</style>
