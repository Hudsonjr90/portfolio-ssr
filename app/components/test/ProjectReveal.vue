<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import TvNoiseEffect from "~/components/UI/TvNoiseEffect.vue";
const props = defineProps({
  active: Boolean,
  index: Number,
  item: Object,
})
const emit = defineEmits(['close'])

const numColumns = 9
const columns = ref(Array.from({ length: numColumns }, (_, i) => ({ id: i })))
const animationDuration = 1000
const showDescription = ref(false)
const isClosing = ref(false)


let scrollTop;

function disableScroll() {
  scrollTop = window.scrollY || document.documentElement.scrollTop;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollTop}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  console.log(455)
}

function enableScroll() {
  document.body.style.position = '';
  document.body.style.top = '';
  window.scrollTo(0, scrollTop); // возвращаем на место
}
// --- Единая функция закрытия ---
async function handleClose() {
  if (!props.active || isClosing.value) return

  isClosing.value = true

  // 1. Скрываем описание
  showDescription.value = false

  // 2. Ждем полного исчезновения описания (0.4s) + пауза (1s)
  await new Promise(resolve => setTimeout(resolve, 500 ))
  enableScroll()
  // 3. Запускаем анимацию закрытия колонок
  if (import.meta.client) { // Проверка для Nuxt.js SSG
    const container = document.querySelector('.reveal_body')
    if (container) {
      const items = container.querySelectorAll('.reveal_item')
      const maxDelay = (numColumns - 1) * 100

      items.forEach((item, index) => {
        item.style.transitionDelay = `${(numColumns - 1 - index) * 100}ms`
        item.style.transform = 'translateY(100%)'
      })

      // 4. Ждем завершения анимации колонок
      await new Promise(resolve => setTimeout(resolve, maxDelay + animationDuration))
    }
  }

  // 5. Закрываем компонент
  emit('close')
  isClosing.value = false
}

// --- Логика анимации открытия ---
function onBeforeEnter(el) {
  if (!import.meta.client) return

  const items = el.querySelectorAll('.reveal_item')
  showDescription.value = false
  items.forEach(item => {
    item.style.transform = 'translateY(100%)'
  })
}

async function onEnter(el, done) {
  if (!import.meta.client) {
    done()
    return
  }

  const maxDelay = (numColumns - 1) * 100

  // Небольшая задержка перед стартом
  await new Promise(resolve => setTimeout(resolve, 50))

  // Анимация колонок
  const items = el.querySelectorAll('.reveal_item')
  items.forEach((item, index) => {
    item.style.transitionDelay = `${index * 100}ms`
    item.style.transform = 'translateY(0%)'
  })
  // Ждем завершения анимации колонок + пауза
  await new Promise(resolve => setTimeout(resolve, animationDuration + maxDelay ))
  disableScroll()

  // Показываем описание
  showDescription.value = true
  window.addEventListener('keydown', handleKey)

  done()
}

// --- Обработчики событий ---
function handleKey(e) {
  if (e.key === 'Escape') {
    handleClose()
  }
}

function handleBackgroundClick(e) {
  if (e.target.classList.contains('reveal_body')) {
    handleClose()
  }
}

onMounted(() => {
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKey)
})
</script>

<template>
  <Transition
      name="reveal"
      :css="false"
      @before-enter="onBeforeEnter"
      @enter="onEnter">

    <div v-if="active" class="reveal_body" @click="handleBackgroundClick">
      <!-- Колонки (родительская часть) -->
      <div
          v-for="col in columns"
          :key="col.id"
          class="reveal_item"
      >
        <TvNoiseEffect/>

      </div>

      <!-- Описание проекта (дочерняя часть) -->
      <div
          class="project-description"
          :class="{ 'visible': showDescription }"
      >
        <img :src="item[index].imgLink" alt="" class="top_fade" >
        <div class="description ">
          <h5 class="left_fade">{{ item[index].title }}</h5>
          <p class="left_fade"> {{ item[index].description }}</p>
          <ul class="technologies_list left_fade">
            <li v-for="(item, index) in item[index].technologies" :key="index" class="skill_text"><p>{{item}}</p></li>
          </ul>
        </div>

      <button class="closeBtn fade" @click="handleClose()">
        <span/>
        <span/>
      </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.reveal_body {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 99999;
}

.reveal_item {
  width: calc(100vw / 9);
  height: 100%;
  background-color: var(--text-color);
  transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
  border-left: 1px solid #0f0f0f38;
}

.project-description {
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 6rem 2rem;
  color: var(--text-color-black);
  font-size: 2rem;
  position: absolute;
  gap: 4rem;
  max-width: 2000px;
}


img{
  width: 100%;
  height: auto;
  min-height: 0;
  object-fit: cover;
  object-position: center;
  flex: 1 1 auto;      /* картинка занимает всё оставшееся место */


}
.description, ul{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 0 0 auto;
}
h5{
  font-size: 4rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-weight: 700;
  transition: 0.6s ease 0.2s;
}
p.left_fade,li{
  font-size: 1.6rem;
  transition: 0.6s ease 0.3s;


}
ul{
  flex-direction: row;
  margin-top: 2rem;
  transition: 0.6s ease 0.4s;
  flex-wrap: wrap;


}
.skill_text>p{
  font-size: 1.4rem;

}

.top_fade{
  transition: 0.6s ease ;

  opacity: 0;
  transform: translateY(-2rem);
}
.left_fade{
  opacity: 0;
  transform: translateX(-2rem);
}
.visible .top_fade{
  opacity: 1;
  transform: translateY(0);
}
.visible .left_fade{
  opacity: 1;
  transform: translateX(0);
}

button.closeBtn{
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  width: 40px;
  height: 40px;
}
.closeBtn span{
  width: 100%;
  height: 2px;
  background-color: black;
  position: absolute;
  transition: 0.4s;
  top: 50%;
  left: 50%;
  transform: translateY(-50%);
}
.closeBtn span:nth-child(1) {
  transform: translate(-50%) rotate(30deg);

}
.closeBtn span:nth-child(2) {
  transform: translate(-50%) rotate(-30deg);
}
.fade span{
  width: 0;
  transition: 0.6s ease ;

}
.visible .fade span{
  width: 100%;
}
.closeBtn:hover span:nth-child(1) {
  transform: translate(-50%) rotate(45deg);

}
.closeBtn:hover span:nth-child(2) {
  transform: translate(-50%) rotate(-45deg);
}
@media screen and (max-width: 850px) {

.project-description{
  flex-direction: column-reverse;
  justify-content: start;
}


}
</style>