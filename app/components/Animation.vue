<template>
  <main id="main">
    <canvas id="canvas" />
    <div class="text-content">
      <TextFadeEffect text="Hudson Kennedy" tag="h1" :threshold="0" :duration="1000" :delay="600" />
      <TextFadeEffect text="Desenvolvedor Full-Stack" :threshold="0" :duration="1000" :root-margin="'0px'" :delay="800" />
    </div>
  </main>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import TextFadeEffect from "~/components/TextFadeEffect.vue";

let onScrollHandler

onMounted(() => {
  if (!window.InstancedMouseEffect) {
    const script = document.createElement('script')
    script.src = '/instancedEffect.js'
    script.onload = initEffect
    document.body.appendChild(script)
  } else {
    initEffect()
  }

  function initEffect() {
    const root = document.documentElement
    const mainColor = getComputedStyle(root).getPropertyValue('--main-color').trim()

    new window.InstancedMouseEffect({
      speed: 1,
      frequency: 2,
      mouseSize: 0,
      rotationSpeed: 0.1,
      color: mainColor,
      colorDegrade: 0,
      shape: "square",
    })

    const canvas = document.getElementById('canvas')

    // optimized scroll handler using requestAnimationFrame
    let ticking = false
    onScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          canvas.style.visibility = window.scrollY > window.innerHeight
              ? 'hidden'
              : 'visible'
          ticking = false
        })
        ticking = true
      }
    }

    // run once immediately
    onScrollHandler()
    window.addEventListener('scroll', onScrollHandler, { passive: true })
  }

})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScrollHandler)
})
</script>

<style scoped>
main {
  position: sticky;
  width: 100vw;
  height: 100dvh;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;

  top: 0;
}

.text-content {
  position: relative;
  z-index: 1;
  margin: 0 0 4rem 4rem;
}

h1 {
  font-size: 10vw;
  font-weight: 700;
}

p {
  font-size: 1.6vw;
}

canvas {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  overflow: hidden;
}

@media (max-width: 768px) {

  .text-content {
    margin: 0 0 2rem 2rem;
  }
  h1 {
    font-size: 6vw !important;
    font-weight: 700;
  }

  p {
    font-size: 1.6vw;
  }
}
</style>
