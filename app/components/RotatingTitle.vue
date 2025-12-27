<template>
  <div :class="tagClass">
    <span 
      v-for="(title, index) in titles" 
      :key="index"
      :class="{
        'title-item': true,
        'active': index === currentIndex,
        'fade-out': index === previousIndex
      }"
    >
      {{ title }}
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  titles: {
    type: Array,
    default: () => ['Arquiteto de Soluções', 'Cientista da Computação', 'Desenvolvedor Full-Stack', 'Engenheiro de Software']
  },
  interval: {
    type: Number,
    default: 3000 
  },
  tag: {
    type: String,
    default: 'p'
  },
  delay: {
    type: Number,
    default: 0
  }
})

const currentIndex = ref(0)
const previousIndex = ref(-1)
const isVisible = ref(false)
let intervalId = null

const tagClass = props.tag === 'h1' ? 'rotating-title-h1' : 'rotating-title-p'

const nextTitle = () => {
  previousIndex.value = currentIndex.value
  currentIndex.value = (currentIndex.value + 1) % props.titles.length
}

onMounted(() => {
  // Delay inicial antes de mostrar a primeira animação
  setTimeout(() => {
    isVisible.value = true
    
    // Iniciar o ciclo de animação
    setTimeout(() => {
      intervalId = setInterval(nextTitle, props.interval)
    }, 1000) // Aguarda 1 segundo antes de iniciar o ciclo
  }, props.delay)
})

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.rotating-title-h1,
.rotating-title-p {
  position: relative;
  display: inline-block;
  min-height: 1.2em;
}

.rotating-title-h1 {
  font-size: 10vw;
  font-weight: 700;
}

.rotating-title-p {
  font-size: 1.6vw;
}

.title-item {
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-in-out;
}

.title-item.active {
  opacity: 1;
  transform: translateY(0);
}

.title-item.fade-out {
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.6s ease-in-out;
}

/* Efeito de typing opcional */
.title-item.active {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Gradiente de cores para dar mais dinamismo */
.rotating-title-p .title-item {
    background: linear-gradient(90deg, #00f6ff, #0ef6cc, #00f6ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@media (max-width: 768px) {
  .rotating-title-h1 {
    font-size: 6vw !important;
  }
  
  .rotating-title-p {
    font-size: 4vw;
  }
}
</style>