<template>
  <div class="popup">
    <img src="https://picsum.photos/800/600" alt="户型图" />
    <div class="site-numbers">
      <div class="site-number" style="left: 100px; top: 100px">A</div>
      <div class="site-number" style="left: 200px; top: 200px">B</div>
      <div class="site-number" style="left: 300px; top: 300px">C</div>
      <div class="site-number" style="left: 400px; top: 400px">D</div>
    </div>
  </div>
  <div>
    <button @click="handleJia">+</button>
    <button @click="handleJian">-</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

let popup: any;
let img: any;
let siteNumbers: any;
let siteNumberList: any;

let scale = 1;
let lastX = 0;
let lastY = 0;
let isDragging = false;
let imgOffsetX = 0;
let imgOffsetY = 0;

let rectBefore: any;

onMounted(() => {
  popup = document.querySelector(".popup");
  img = popup.querySelector("img");
  siteNumbers = popup.querySelector(".site-numbers");
  siteNumberList = siteNumbers.querySelectorAll(".site-number");

  rectBefore = img.getBoundingClientRect();
  // 注册事件
  img.addEventListener("wheel", handlePinch);
  img.addEventListener("mousedown", handleDragStart);
  document.addEventListener("mousemove", handleDragMove);
  document.addEventListener("mouseup", handleDragEnd);

  img.addEventListener("touchstart", handleTouchStart);
  img.addEventListener("touchmove", handleTouchMove);
  img.addEventListener("touchend", handleTouchEnd);
});

// 缩放
const handlePinch = (event) => {
  event.preventDefault();
  console.log("pinch", event.deltaY);
  scale *= event.deltaY > 0 ? 0.9 : 1.1;
  scale = Math.min(Math.max(0.5, scale), 2);

  img.style.transform = `translate(${imgOffsetX}px, ${imgOffsetY}px) scale(${scale})`;
  const rectAfter = img.getBoundingClientRect();
  const offsetX = rectAfter.left - rectBefore.left;
  const offsetY = rectAfter.top - rectBefore.top;

  siteNumbers.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale}`;
};

const handleJia = () => {
  //   scale *= event.deltaY > 0 ? 0.9 : 1.1;
  scale *= 1.1;
  scale = Math.min(Math.max(0.5, scale), 2);

  img.style.transform = `translate(${imgOffsetX}px, ${imgOffsetY}px) scale(${scale})`;
  const rectAfter = img.getBoundingClientRect();
  const offsetX = rectAfter.left - rectBefore.left;
  const offsetY = rectAfter.top - rectBefore.top;

  siteNumbers.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale}`;
};
const handleJian = () => {
  scale *= 0.9;
  scale = Math.min(Math.max(0.5, scale), 2);

  img.style.transform = `translate(${imgOffsetX}px, ${imgOffsetY}px) scale(${scale})`;
  const rectAfter = img.getBoundingClientRect();
  const offsetX = rectAfter.left - rectBefore.left;
  const offsetY = rectAfter.top - rectBefore.top;

  siteNumbers.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale}`;
};

// 拖拽
const handleDragStart = (event) => {
  event.preventDefault();
  lastX = event.clientX || event.touches[0].clientX;
  lastY = event.clientY || event.touches[0].clientY;
  isDragging = true;
};

const handleDragMove = (event) => {
  event.preventDefault();
  if (!isDragging) {
    return;
  }

  const deltaX = (event.clientX || event.touches[0].clientX) - lastX;
  const deltaY = (event.clientY || event.touches[0].clientY) - lastY;
  console.log("move", deltaX, scale);
  imgOffsetX += deltaX;
  imgOffsetY += deltaY;

  img.style.transform = `translate(${imgOffsetX}px, ${imgOffsetY}px) scale(${scale})`;
  const rectAfter = img.getBoundingClientRect();
  const offsetX = rectAfter.left - rectBefore.left;
  const offsetY = rectAfter.top - rectBefore.top;
  siteNumbers.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
  lastX = event.clientX || event.touches[0].clientX;
  lastY = event.clientY || event.touches[0].clientY;
};

const handleDragEnd = (event) => {
  event.preventDefault();
  isDragging = false;
};

// 点击站点号
const handleSiteNumberClick = (event) => {
  const siteNumber = event.target;
  // 处理点击站点号的逻辑
  console.log(`点击了站点号 ${siteNumber.innerText}`);
};

// 初始化站点号位置
// siteNumberList.forEach((siteNumber) => {
//   const left = parseFloat(siteNumber.style.left);
//   const top = parseFloat(siteNumber.style.top);
//   siteNumber.dataset.left = left;
//   siteNumber.dataset.top = top;
// });

// 移动端手势事件
let lastDistance = 0;
let isPinching = false;

const handleTouchStart = (event) => {
  if (event.touches.length === 2) {
    lastDistance = Math.sqrt(
      (event.touches[0].clientX - event.touches[1].clientX) ** 2 +
        (event.touches[0].clientY - event.touches[1].clientY) ** 2
    );
    isPinching = true;
  } else if (event.touches.length === 1) {
    handleDragStart(event);
  }
};

const handleTouchMove = (event) => {
  if (isPinching) {
    const distance = Math.sqrt(
      (event.touches[0].clientX - event.touches[1].clientX) ** 2 +
        (event.touches[0].clientY - event.touches[1].clientY) ** 2
    );
    scale *= distance / lastDistance;
    scale = Math.min(Math.max(0.5, scale), 2);

    img.style.transform = `translate(${imgOffsetX}px, ${imgOffsetY}px) scale(${scale})`;
    const rectAfter = img.getBoundingClientRect();
    const offsetX = rectAfter.left - rectBefore.left;
    const offsetY = rectAfter.top - rectBefore.top;
    siteNumbers.style.transform = `translate(${imgOffsetX}px, ${imgOffsetY}px) scale(${scale})`;
    lastDistance = distance;
  } else {
    handleDragMove(event);
  }
};

const handleTouchEnd = (event) => {
  if (isPinching) {
    isPinching = false;
  } else {
    handleDragEnd(event);
  }
};

// siteNumberList.forEach((siteNumber) => {
//   siteNumber.addEventListener("click", handleSiteNumberClick);
// });
</script>

<style scoped>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 600px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.popup img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: move;
}

.popup .site-numbers {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 重点 */
  pointer-events: none;
  /* 重点 */
  transform-origin: top left;
}

.popup .site-number {
  position: absolute;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background-color: #f00;
  color: #fff;
  border-radius: 50%;
  /* 重点 */
  pointer-events: auto;
}
</style>
