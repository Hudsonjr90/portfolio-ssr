<template>
  <div ref="containerElement" class="masked-line-container">
    <component :is="tag" ref="textElement" class="split-text">
      {{ text }}
    </component>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({
  tag: { type: String, default: 'p' },
  text: { type: String, default: 'Your animated text goes here!' },
  duration: { type: Number, default: 600 },
  ease: { type: String, default: 'cubic-bezier(0.19, 1, 0.22, 1)' },
  threshold: { type: Number, default: 0.5 },
  triggerOnce: { type: Boolean, default: true },
  rootMargin: { type: String, default: '0px 0px -100px 0px' },
  delay: { type: Number, default: 0 }
})

const textElement = ref(null)
const containerElement = ref(null)
let observer = null
let animationTimeout = null
let state = 'idle'

const clearTimeoutSafe = () => {
  if (animationTimeout) clearTimeout(animationTimeout)
  animationTimeout = null
}

const startAnimation = () => {
  if (!textElement.value || state !== 'idle') return

  state = 'appearing'
  textElement.value.style.transition =
      `transform ${props.duration}ms ${props.ease}, opacity ${props.duration}ms ${props.ease}`
  textElement.value.style.transitionDelay = `${props.delay}ms`
  textElement.value.style.transform = 'translateY(0%)'
  textElement.value.style.opacity = '1'

  animationTimeout = setTimeout(() => {
    textElement.value.style.transition = ''
    state = 'visible'
  }, props.duration + props.delay)
}

const createObserver = () => {
  if (!containerElement.value) return
  observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && state === 'idle') {
            startAnimation()
            if (props.triggerOnce) observer?.unobserve(entry.target)
          }
        })
      },
      { threshold: props.threshold, rootMargin: props.rootMargin }
  )
  observer.observe(containerElement.value)
}

onMounted(() => {
  nextTick(() => {
    if (textElement.value) {
      textElement.value.style.transform = 'translateY(100%)'
      textElement.value.style.opacity = '0'
    }
    createObserver()
  })
})

onBeforeUnmount(() => {
  clearTimeoutSafe()
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.masked-lines-container {
    display: flex;
    flex-direction: column;
    position: relative;
}

.skill_section .split-text {
    color: black;
}

.split-text {
    opacity: 0;
    text-align: left;
    color: #ffffff;
    font-size: clamp(2rem, 2vw, 3rem);
    letter-spacing: 0.05rem;
    margin: 0;
    will-change: transform;
}

.split-text :deep(.line-container) {
    overflow: hidden;
    display: block;
    will-change: transform;
  width: 100%;
}
.split-text,
.split-text :deep(.line-content) {
  color: #fff;
}

.split-text :deep(.line-content) {
  opacity: 0;             /* изначально */
  transform: translateY(100%);
  transition: transform 0.6s, opacity 0.6s;
}
.split-text :deep(.line-content) {
  display: inline-block;
  white-space: pre-wrap;
  word-wrap: break-word;
  will-change: transform, opacity;
}

.split-text :deep(.word) {
    display: inline;
    white-space: nowrap;
}

.split-text :deep(.line-content) {
    transform: translateZ(0);
}
h1.split-text {
  font-size: clamp(2.5rem, 10vw, 8rem);
  font-weight: 700;
}
main p.split-text{
  font-size: clamp(2rem, 2vw, 5rem);
}
@media (max-width: 768px) {
    .split-text {
        font-size: clamp(1.5rem, 4vw, 3rem);
    }

    .masked-lines-container {
        padding: 1rem 0;
        /* min-height: 40vh; */
    }
  h1.split-text {
    font-size: clamp(2.5rem, 10vw, 5rem) ;
    padding:  0;

  }
  .description .split-text {
    font-size: clamp(1.3rem, 2vw, 3rem) ;
    max-width: 100%;

  }

}

@media (prefers-reduced-motion: reduce) {
    .split-text :deep(.line-content) {
        transition: none !important;
    }
}
</style>