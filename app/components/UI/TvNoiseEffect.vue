<script setup>
// Логика не требуется
</script>

<template>
  <div class="noise-gif"></div>
</template>

<style scoped>
.noise-gif {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-image: url('@/assets/img/gif/NOISE_400.gif');
  background-repeat: repeat;
  opacity: 0.6;
  mix-blend-mode: overlay;
  z-index: 10;
}
.noise-dark-rounded {
  border-radius: 1rem;
  overflow: hidden;
  mix-blend-mode: screen;
  opacity: 0.12;
  z-index: 2;

}
</style>