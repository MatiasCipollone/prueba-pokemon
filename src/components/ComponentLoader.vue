<template>
  <div class="loader">
    <img src="@/assets/loader.png" alt="Loading..." />
  </div>
</template>

<style scoped lang="scss">
@keyframes bounceAndRotate {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  40% {
    transform: translateY(-30px) rotate(10deg);
  }
  60% {
    transform: translateY(-15px) rotate(-10deg);
  }
}

.loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  animation: bounceAndRotate 1.5s infinite;

  img {
    width: 100%;
    height: auto;
  }
}
</style>
